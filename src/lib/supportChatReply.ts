import type { Locale } from '@/data/localized';
import { chatTalkAnswer, isChatIssue, isYesNoQuestion, matchChatTalk, matchChatTopic, type ChatCopy, type ChatTalk, type ChatTopic } from '@/data/site/supportChat';
import type { GuideMatch } from '@/lib/supportGuideSearch';

export type ChatReply =
  | { kind: 'topic'; topic: ChatTopic }
  | { kind: 'talk'; talk: ChatTalk; text: string }
  | GuideMatch
  // Kendala yang tidak ada panduannya: diteruskan ke admin, bukan ditebak.
  | { kind: 'handoff' }
  | { kind: 'fallback' };

type FindGuide = (question: string, isIssue: boolean, previous?: GuideMatch) => GuideMatch | undefined;

// Pertanyaan calon pelanggan. Jawabannya ringkas dan punya tombol tujuannya
// sendiri, jadi tidak dicarikan di Buku Panduan.
const salesTopics: ReadonlySet<ChatTopic> = new Set(['pricing', 'trial', 'register', 'download']);

/**
 * Balasan yang tidak perlu membuka Buku Panduan: basa-basi, pertanyaan calon
 * pelanggan, dan semua bahasa selain Indonesia. `undefined` berarti
 * jawabannya harus dicari lewat [guideReply].
 */
export function quickReply(copy: ChatCopy, locale: Locale, question: string, previous?: ChatReply): ChatReply | undefined {
  const talk = matchChatTalk(copy, question);
  // "Terus?" hanya berarti sesuatu setelah sebuah panduan atau pilihan.
  const said = talk === 'next' ? (previous?.kind === 'guide' ? 'next' : previous?.kind === 'choices' && copy.talk.pick ? 'pick' : undefined) : talk;
  if (said) return { kind: 'talk', talk: said, text: chatTalkAnswer(copy, said, question) };
  const topic = matchChatTopic(copy, question);
  // Setelah bot menawarkan pilihan, "Windows" adalah jawaban atas pilihan itu,
  // bukan pertanyaan soal unduhan.
  const answering = locale === 'id' && previous?.kind === 'choices';
  if (topic && salesTopics.has(topic) && !answering) return { kind: 'topic', topic };
  if (locale !== 'id') return topic ? { kind: 'topic', topic } : { kind: 'fallback' };
}

export function guideReply(copy: ChatCopy, question: string, previous: ChatReply | undefined, findGuide: FindGuide): ChatReply {
  const issue = isChatIssue(copy, question);
  const context = previous?.kind === 'guide' || previous?.kind === 'choices' ? previous : undefined;
  const match = findGuide(question, issue, context);
  const topic = matchChatTopic(copy, question);
  // Tebakan "mungkin maksud Anda" kalah dari jawaban topik yang sudah pasti,
  // dan "bisa pakai QRIS ga?" dijawab dulu sebelum ditawari daftar panduan.
  const unsure = match?.kind === 'choices' && (match.prompt === 'maybe' || (match.prompt === 'topic' && isYesNoQuestion(copy, question)));
  if (match && !(topic && unsure)) return match;
  if (topic) return { kind: 'topic', topic };
  return issue ? { kind: 'handoff' } : { kind: 'fallback' };
}
