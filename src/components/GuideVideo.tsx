"use client";
import { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';

export default function GuideVideo({ title, tablet, phone }: { title: string; tablet: string; phone: string }) {
  const [device, setDevice] = useState<'tablet' | 'phone'>('tablet');
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const videoId = device === 'tablet' ? tablet : phone;
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyFailed(false);
    } catch { setCopyFailed(true); }
  }
  return <>
    <div className="flex gap-2" aria-label="Pilih perangkat">{(['tablet', 'phone'] as const).map(value => <button type="button" key={value} aria-pressed={device === value} className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${device === value ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:bg-soft'}`} onClick={() => { setDevice(value); setPlaying(false); }}>{value === 'tablet' ? 'Tablet' : 'Ponsel'}</button>)}</div>
    <div className="aspect-video overflow-hidden rounded-xl bg-ink">{playing ? <iframe key={videoId} src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} title={`${title} — ${device === 'tablet' ? 'Tablet' : 'Ponsel'}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="h-full w-full border-0"/> : <button type="button" onClick={() => setPlaying(true)} className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 p-4 text-center text-white"><Play size={40} aria-hidden="true"/><span>Putar panduan {device === 'tablet' ? 'tablet' : 'ponsel'}</span><small>{title}</small></button>}</div>
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold"><a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">Tonton di YouTube ↗</a><button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 hover:bg-soft">{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Link tersalin' : 'Salin link panduan'}</button></div>
    <p className="min-h-5 text-xs text-mute" role="status">{copyFailed ? 'Salin alamat halaman ini dari bilah alamat browser untuk membagikan panduan.' : copied ? 'Bagikan link ini agar penerima langsung membuka panduan fitur yang sama.' : ''}</p>
  </>;
}
