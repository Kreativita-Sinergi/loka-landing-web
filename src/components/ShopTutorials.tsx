import { Play, ChevronDown } from 'lucide-react';
import { getTutorials } from '@/data/tutorials';
import { getMenuItems } from '@/data/menuItems';
import type { Locale } from '@/data/localized';
export default function ShopTutorials({ locale }: { locale: Locale }) {
  const copy = getTutorials(locale);
  const label = getMenuItems(locale).find(item => item.url === '#tutorial')?.text ?? 'Tutorial';
  return <details id="tutorial" className="shop-tutorials"><summary><span><Play size={14}/>{label}</span><ChevronDown size={16}/></summary><div className="shop-tutorial-list">{copy.videos.map(video => <details key={video.slug}><summary>{video.title}<Play size={13}/></summary><video src={`/videos/tutorials/${video.slug}.mp4`} poster={`/videos/tutorials/${video.slug}_poster.jpg`} controls playsInline preload="none" aria-label={video.title}/></details>)}</div></details>;
}
