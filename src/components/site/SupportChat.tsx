'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';

import type { Locale } from '@/data/localized';
import { chatSuggestions, matchChatTopic, supportChatCopy, technicalChatCopy, type ChatTopic } from '@/data/site/supportChat';
import { fetchPrices, formatPrice } from '@/lib/pricing';
import { guideReply, quickReply, type ChatReply } from '@/lib/supportChatReply';
import type { GuideAnswer } from '@/lib/supportGuideSearch';
import { trackContactClick } from '@/utils/analytics';
import FloatingWa from './FloatingWa';
import { WhatsAppIcon } from './ui';

type ChatLinks = Record<'pricing' | 'register' | 'download' | 'guide' | 'faq' | 'whatsapp', string>;
type ProPrice = { monthly: string; yearly: string };
type Reply = ChatReply | { kind: 'pending' } | { kind: 'unavailable' };
type Turn = { id: number; question: string; reply: Reply; price?: ProPrice };

// Jeda sebelum balasan tampil. Jawaban yang muncul di milidetik yang sama
// dengan pertanyaannya terbaca seperti tempelan, bukan balasan.
const typingDelay = 550;

const backofficeOrigin = 'https://app.lokakasir.id';

// Dibuka di dalam panel Web Admin, yang sudah punya tombol tutupnya sendiri.
const subscribeNever = () => () => {};
const isFramed = () => window.parent !== window;
const notFramed = () => false;

const actionLinks: Partial<Record<ChatTopic, keyof ChatLinks>> = {
  trial: 'pricing',
  pricing: 'pricing',
  register: 'register',
  download: 'download',
};

const botBubble = 'w-fit max-w-[94%] rounded-2xl rounded-tl-sm border border-line bg-white px-3.5 py-3 text-base leading-relaxed';
const answerLink = 'mt-2 inline-block text-sm font-bold text-brand-dark underline underline-offset-2';
const suggestionButton = 'min-h-10 rounded-full border border-brand/25 bg-white px-3 text-sm font-semibold text-brand-dark hover:bg-tint';

function ChatLink({ href, embedded, onClick, className, children }: {
  href: string;
  embedded: boolean;
  onClick: () => void;
  className: string;
  children: string;
}) {
  return embedded ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={href} onClick={onClick} className={className}>{children}</Link>
  );
}

function TypingDots({ label }: { label: string }) {
  return (
    <p className="flex h-7 items-center gap-1.5">
      <span className="sr-only">{label}</span>
      {[0, 150, 300].map((delay) => (
        <span key={delay} aria-hidden className="size-2 rounded-full bg-body/60 motion-safe:animate-bounce" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </p>
  );
}

function WhatsAppReply({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactClick('whatsapp', 'support_chat_reply')}
      className={`${suggestionButton} mt-3 inline-flex items-center gap-2`}
    >
      <WhatsAppIcon size={16} />{children}
    </a>
  );
}

function GuideReply({ guide, closeChat, embedded }: { guide: GuideAnswer; closeChat: () => void; embedded: boolean }) {
  return (
    <div lang="id">
      <p className="font-bold">{guide.title}</p>
      {guide.text && <p className="mt-2 whitespace-pre-line">{guide.text}</p>}
      {guide.steps && guide.steps.length > 0 && (
        <ol className="mt-2 list-decimal space-y-2 pl-5 marker:font-bold marker:text-brand-dark">
          {guide.steps.map((step, index) => (
            <li key={index}>
              {step.title && <strong className="block">{step.title}</strong>}
              {step.body}
            </li>
          ))}
        </ol>
      )}
      {guide.tip && <p className="mt-3 rounded-lg bg-tint p-2.5 text-sm">{guide.tip}</p>}
      {guide.pdf ? (
        <a href={guide.href} target="_blank" rel="noopener noreferrer" className={answerLink}>{technicalChatCopy.pdf}</a>
      ) : (
        <ChatLink href={guide.href} embedded={embedded} onClick={closeChat} className={answerLink}>{guide.faq ? technicalChatCopy.faq : technicalChatCopy.guide}</ChatLink>
      )}
    </div>
  );
}

export default function SupportChat({ locale, links, embedded = false }: { locale: Locale; links: ChatLinks; embedded?: boolean }) {
  const copy = supportChatCopy[locale];
  const [open, setOpen] = useState(embedded);
  const [draft, setDraft] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const panelId = useId();
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const latestReply = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const framed = useSyncExternalStore(subscribeNever, isFramed, notFramed);
  const prices = useRef<Promise<ProPrice | undefined>>(undefined);

  useEffect(() => {
    if (open && !embedded) closeButton.current?.focus({ preventScroll: true });
  }, [open, embedded]);

  useEffect(() => {
    if (embedded && window.parent !== window) window.parent.postMessage('loka:support-chat:ready', backofficeOrigin);
  }, [embedded]);

  useEffect(() => {
    const log = conversation.current;
    const reply = latestReply.current;
    if (log && reply) log.scrollTop = reply.offsetTop - 12;
  }, [open, turns]);

  function closeChat() {
    if (embedded) {
      if (window.parent !== window) window.parent.postMessage('loka:support-chat:close', backofficeOrigin);
      else window.location.assign(links.guide);
      return;
    }
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  }

  function loadPrice() {
    prices.current ??= Promise.race([
      fetchPrices('ID'),
      new Promise<null>((resolve) => window.setTimeout(resolve, 2500, null)),
    ]).then((list) => {
      const amount = (plan: string) => list?.find((price) => price.plan === plan)?.charge_amount;
      const [monthly, yearly] = [amount('pro'), amount('pro-yearly')];
      if (monthly && yearly) {
        const rupiah = (value: number) => formatPrice(value, 'IDR', 'ID').replace(/^Rp\s+/, 'Rp');
        return { monthly: rupiah(monthly), yearly: rupiah(yearly) };
      }
      // Harga yang gagal dimuat dicoba lagi di pertanyaan berikutnya.
      prices.current = undefined;
    });
    return prices.current;
  }

  function ask(question: string, direct?: ChatReply) {
    const id = nextId.current++;
    const last = turns.at(-1)?.reply;
    const previous = last && last.kind !== 'pending' && last.kind !== 'unavailable' ? last : undefined;
    const quick = direct ?? quickReply(copy, locale, question, previous);
    setTurns((current) => [...current, { id, question, reply: { kind: 'pending' } }]);

    const typed = new Promise((resolve) => window.setTimeout(resolve, typingDelay));
    const finish = (reply: Reply, price?: ProPrice) => void typed.then(() => {
      setTurns((current) => current.map((turn) => turn.id === id ? { ...turn, reply, price } : turn));
    });
    if (quick) {
      // Harga rupiah diambil dari sumber yang sama dengan halaman harga.
      if (locale === 'id' && quick.kind === 'topic' && quick.topic === 'pricing') void loadPrice().then((price) => finish(quick, price));
      else finish(quick);
      return;
    }
    void import('@/lib/supportGuideSearch').then(({ findGuideMatch }) => {
      finish(guideReply(copy, question, previous, findGuideMatch));
    }).catch(() => {
      const topic = matchChatTopic(copy, question);
      finish(topic ? { kind: 'topic', topic } : { kind: 'unavailable' });
    });
  }

  function whatsappAbout(question: string) {
    return `${links.whatsapp.split('?')[0]}?text=${encodeURIComponent(technicalChatCopy.handoffMessage(question))}`;
  }

  function sendQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    ask(question);
    setDraft('');
    input.current?.focus({ preventScroll: true });
  }

  const suggestions = (
    <div className="flex flex-wrap gap-2">
      {locale === 'id' && technicalChatCopy.suggestions.map((question) => (
        <button key={question} type="button" onClick={() => ask(question)} className={suggestionButton}>{question}</button>
      ))}
      {(locale === 'id' ? ['pricing'] as const : chatSuggestions).map((topic) => (
        <button
          key={topic}
          type="button"
          onClick={() => ask(copy.topics[topic].label, { kind: 'topic', topic })}
          className={suggestionButton}
        >
          {copy.topics[topic].label}
        </button>
      ))}
    </div>
  );

  return (
    <div className={embedded ? 'h-dvh w-full' : clsx('fixed right-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] flex items-center gap-3 md:right-8 md:bottom-[calc(2rem+env(safe-area-inset-bottom))]', open ? 'z-50' : 'z-30')}>
      {!embedded && <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        onClick={() => open ? closeChat() : setOpen(true)}
        className="inline-flex h-14 items-center gap-2 rounded-full bg-brand px-4 text-sm font-bold text-white shadow-[0_8px_24px_rgba(13,93,243,0.26)] transition-colors hover:bg-brand-dark"
      >
        <MessageCircle size={21} aria-hidden />
        {copy.title}
      </button>}
      {open && (
        <section
          id={panelId}
          role="dialog"
          aria-labelledby={`${panelId}-title`}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              closeChat();
            }
          }}
          className={clsx('flex flex-col overflow-hidden bg-white', embedded ? 'h-full w-full' : 'absolute right-0 bottom-full mb-3 h-[33rem] max-h-[calc(100dvh-6.5rem-env(safe-area-inset-bottom))] w-[min(25rem,calc(100vw-2.5rem))] rounded-2xl border border-line shadow-[0_20px_60px_rgba(16,24,40,0.24)] md:max-h-[calc(100dvh-7.25rem-env(safe-area-inset-bottom))]')}
        >
          <header className="flex shrink-0 items-center gap-3 bg-brand py-3 pr-2 pl-4 text-white">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15"><Bot size={22} aria-hidden /></span>
            <div className="min-w-0 flex-1">
              <h2 id={`${panelId}-title`} className="font-bold">{copy.title}</h2>
              <p className="text-sm text-white">{copy.bot}</p>
            </div>
            {/* Di panel Web Admin tombol tutup milik panelnya; dua tombol ✕
                bertumpuk membuat orang ragu mana yang menutup apa. */}
            {!(embedded && framed) && <button
              ref={closeButton}
              type="button"
              aria-label={copy.close}
              onClick={closeChat}
              className="grid size-11 shrink-0 place-items-center rounded-lg hover:bg-white/15 focus-visible:-outline-offset-4 focus-visible:outline-white"
            ><X size={20} aria-hidden /></button>}
          </header>

          <div ref={conversation} className="relative flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-soft p-4 [overflow-wrap:anywhere]">
            <p className={botBubble}>{copy.welcome}</p>
            {suggestions}
            <div role="log" aria-labelledby={`${panelId}-title`} className="flex flex-col gap-3">
              {turns.map(({ id, question, reply, price }, index) => {
                const response = reply.kind === 'topic' && copy.topics[reply.topic];
                const link = reply.kind === 'topic' && actionLinks[reply.topic];
                const talk = reply.kind === 'talk' && copy.talk[reply.talk];
                return (
                  <div key={id} className="flex flex-col gap-3">
                    <p className="max-w-[90%] self-end rounded-2xl rounded-tr-sm bg-brand px-3.5 py-2.5 text-base leading-relaxed text-white">
                      <span className="sr-only">{copy.you}: </span>{question}
                    </p>
                    <div ref={index === turns.length - 1 ? latestReply : undefined} className={botBubble}>
                      <span className="sr-only">{copy.bot}: </span>
                      {reply.kind === 'guide' && <GuideReply guide={reply.guide} closeChat={closeChat} embedded={embedded} />}
                      {reply.kind === 'choices' && (
                        <div>
                          <p>{{ platform: technicalChatCopy.choosePlatform, topic: technicalChatCopy.chooseTopic, maybe: technicalChatCopy.chooseNearest }[reply.prompt]}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {reply.choices.map(({ label, match }) => (
                              <button key={label} type="button" className={`${suggestionButton} text-left`} onClick={() => ask(label, match)}>{label}</button>
                            ))}
                          </div>
                        </div>
                      )}
                      {reply.kind === 'unavailable' && (
                        <>
                          <p>{technicalChatCopy.unavailable}</p>
                          <ChatLink href={links.guide} onClick={closeChat} embedded={embedded} className={answerLink}>{technicalChatCopy.guide}</ChatLink>
                        </>
                      )}
                      {reply.kind === 'pending' && <TypingDots label={copy.typing} />}
                      {reply.kind === 'talk' && <p>{reply.text}</p>}
                      {talk && talk.suggest && <div className="mt-3">{suggestions}</div>}
                      {talk && talk.whatsapp && <WhatsAppReply href={links.whatsapp}>{copy.whatsapp}</WhatsAppReply>}
                      {reply.kind === 'handoff' && (
                        <>
                          <p>{technicalChatCopy.handoff}</p>
                          <WhatsAppReply href={whatsappAbout(question)}>{technicalChatCopy.handoffAction}</WhatsAppReply>
                        </>
                      )}
                      {reply.kind === 'fallback' && <p>{copy.fallback}</p>}
                      {reply.kind === 'fallback' && locale === 'id' && (
                        <WhatsAppReply href={whatsappAbout(question)}>{technicalChatCopy.handoffAction}</WhatsAppReply>
                      )}
                      {response && <p>{price ? technicalChatCopy.price(price.monthly, price.yearly) : response.answer}</p>}
                      {response && response.action && link && (
                        <ChatLink href={links[link]} onClick={closeChat} embedded={embedded} className={answerLink}>
                          {response.action}
                        </ChatLink>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <footer className="shrink-0 border-t border-line bg-white p-3">
            <form onSubmit={sendQuestion} className="flex gap-2">
              <input
                ref={input}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={300}
                autoComplete="off"
                enterKeyHint="send"
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                className="min-w-0 flex-1 rounded-xl border border-line bg-soft px-3 text-base text-ink placeholder:text-body"
              />
              <button
                type="submit"
                aria-label={copy.send}
                disabled={!draft.trim()}
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand text-white hover:bg-brand-dark disabled:bg-tint disabled:text-brand-dark"
              ><Send size={18} aria-hidden /></button>
            </form>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('whatsapp', 'support_chat')} className="inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-brand-dark hover:underline">
                <WhatsAppIcon size={16} />{copy.whatsapp}
              </a>
              <ChatLink href={links.faq} onClick={closeChat} embedded={embedded} className="inline-flex min-h-8 items-center text-sm font-semibold text-body hover:underline">{copy.faq}</ChatLink>
            </div>
          </footer>
        </section>
      )}
      {!embedded && <FloatingWa href={links.whatsapp} label={copy.whatsapp} />}
    </div>
  );
}
