import { Plus, ArrowUpRight } from 'lucide-react';
import { getFaqs } from '@/data/faq';
import { getStorefront } from '@/data/storefront';
import { getRegisterHelp } from '@/data/cta';
import type { Locale } from '@/data/localized';

const questions: Record<Locale,string[]> = {
  id: ['Mulai pakai dari mana?','Bisa coba gratis?','Kasir dan Web Admin bedanya apa?','Cocok buat usaha apa saja?','Bisa dipakai tanpa internet?'],
  en: ['How do I get started?','Can I try it free?','Register or Web Admin?','Which shops is it for?','Does it work offline?'],
  ms: ['Bagaimana nak mula?','Boleh cuba percuma?','Kaunter dan Web Admin, apa bezanya?','Sesuai untuk perniagaan apa?','Boleh guna tanpa internet?'],
  ja: ['どう始めればいいですか？','無料で試せますか？','レジと管理画面の違いは？','どんなお店に向いていますか？','オフラインで使えますか？'],
};
export default function FAQ({ locale }: { locale: Locale }) {
  const copy = getStorefront(locale);
  const faqs = getFaqs(locale);
  const offlineIndex = faqs.findIndex(faq => /offline|internet|オフライン|luar talian/i.test(faq.question));
  const selected = [0,2,3,4, ...(offlineIndex >= 0 ? [offlineIndex] : [])];
  const help = getRegisterHelp(locale);
  return <section id="faq" className="shop-section shop-faq"><div className="shop-faq-heading"><p className="shop-eyebrow">05 / FAQ</p><h2>{copy.faq}</h2><a href={`https://wa.me/${help.whatsapp}?text=${encodeURIComponent(help.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">{copy.contact}<ArrowUpRight size={16}/></a></div><div className="shop-faq-list">{selected.map((index,i) => <details key={faqs[index].question}><summary>{questions[locale][i]}<Plus size={17}/></summary><p>{faqs[index].answer}</p></details>)}<details className="shop-faq-more"><summary>{copy.moreFaq}<Plus size={17}/></summary><div>{faqs.filter((_,i) => !selected.includes(i)).map(faq => <details key={faq.question}><summary>{faq.question}<Plus size={17}/></summary><p>{faq.answer}</p></details>)}</div></details></div></section>;
}
