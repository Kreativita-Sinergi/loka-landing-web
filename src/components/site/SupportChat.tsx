'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

import type { Locale } from '@/data/localized';
import { chatSuggestions, matchChatTopic, supportChatCopy, type ChatTopic } from '@/data/site/supportChat';
import { trackContactClick } from '@/utils/analytics';
import FloatingWa from './FloatingWa';
import { WhatsAppIcon } from './ui';

type ChatLinks = Record<'pricing' | 'register' | 'download' | 'faq' | 'whatsapp', string>;
type Turn = { question: string; topic?: ChatTopic };

const actionLinks: Partial<Record<ChatTopic, keyof ChatLinks>> = {
  trial: 'pricing',
  pricing: 'pricing',
  register: 'register',
  download: 'download',
};

const botBubble = 'w-fit max-w-[94%] rounded-2xl rounded-tl-sm border border-line bg-white px-3.5 py-3 text-base leading-relaxed';

export default function SupportChat({ locale, links }: { locale: Locale; links: ChatLinks }) {
  const copy = supportChatCopy[locale];
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const panelId = useId();
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const conversation = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) closeButton.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    const log = conversation.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [open, turns]);

  function closeChat() {
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  }

  function ask(question: string, topic = matchChatTopic(copy, question)) {
    setTurns((current) => [...current, { question, topic }]);
  }

  function sendQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    ask(question);
    setDraft('');
    input.current?.focus({ preventScroll: true });
  }

  return (
    <div className={clsx('fixed right-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] flex items-center gap-3 md:right-8 md:bottom-[calc(2rem+env(safe-area-inset-bottom))]', open ? 'z-50' : 'z-30')}>
      <button
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
      </button>
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
          className="absolute right-0 bottom-full mb-3 flex h-[33rem] max-h-[calc(100dvh-6.5rem-env(safe-area-inset-bottom))] w-[min(25rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_60px_rgba(16,24,40,0.24)] md:max-h-[calc(100dvh-7.25rem-env(safe-area-inset-bottom))]"
        >
          <header className="flex shrink-0 items-center gap-3 bg-brand py-3 pr-2 pl-4 text-white">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15"><Bot size={22} aria-hidden /></span>
            <div className="min-w-0 flex-1">
              <h2 id={`${panelId}-title`} className="font-bold">{copy.title}</h2>
              <p className="text-sm text-white">{copy.bot}</p>
            </div>
            <button
              ref={closeButton}
              type="button"
              aria-label={copy.close}
              onClick={closeChat}
              className="grid size-11 shrink-0 place-items-center rounded-lg hover:bg-white/15 focus-visible:-outline-offset-4 focus-visible:outline-white"
            ><X size={20} aria-hidden /></button>
          </header>

          <div ref={conversation} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-soft p-4 [overflow-wrap:anywhere]">
            <p className={botBubble}>{copy.welcome}</p>
            <div className="flex flex-wrap gap-2">
              {chatSuggestions.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => ask(copy.topics[topic].label, topic)}
                  className="min-h-10 rounded-full border border-brand/25 bg-white px-3 text-sm font-semibold text-brand-dark hover:bg-tint"
                >
                  {copy.topics[topic].label}
                </button>
              ))}
            </div>
            <div role="log" aria-labelledby={`${panelId}-title`} className="flex flex-col gap-3">
              {turns.map(({ question, topic }, index) => {
                const response = topic && copy.topics[topic];
                const link = topic && actionLinks[topic];
                return (
                  <div key={index} className="flex flex-col gap-3">
                    <p className="max-w-[90%] self-end rounded-2xl rounded-tr-sm bg-brand px-3.5 py-2.5 text-base leading-relaxed text-white">
                      <span className="sr-only">{copy.you}: </span>{question}
                    </p>
                    <div className={botBubble}>
                      <p><span className="sr-only">{copy.bot}: </span>{response ? response.answer : copy.fallback}</p>
                      {response && response.action && link && (
                        <Link href={links[link]} onClick={closeChat} className="mt-2 inline-block text-sm font-bold text-brand-dark underline underline-offset-2">
                          {response.action}
                        </Link>
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
              <Link href={links.faq} onClick={closeChat} className="inline-flex min-h-8 items-center text-sm font-semibold text-body hover:underline">{copy.faq}</Link>
            </div>
          </footer>
        </section>
      )}
      <FloatingWa href={links.whatsapp} label={copy.whatsapp} />
    </div>
  );
}
