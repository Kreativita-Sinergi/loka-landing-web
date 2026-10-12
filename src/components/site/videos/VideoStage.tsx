'use client';

import { Player, type CallbackListener, type PlayerRef } from '@remotion/player';
import { Maximize2, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import type { FeatureVideoId } from './meta';
import { FEATURE_VIDEOS, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from './registry';

/**
 * Pemutar video fitur (Remotion Player). Video dirender langsung di browser
 * dari komponen React, jadi tajam di semua ukuran layar tanpa berkas MP4.
 * Diputar hanya saat terlihat; di luar layar dijeda supaya tidak membebani.
 */
export default function VideoStage({
  id,
  autoPlay,
  onEnded,
  onProgress,
  label,
}: {
  id: FeatureVideoId;
  autoPlay: boolean;
  /** Tanpa `onEnded` video diulang terus. */
  onEnded?: () => void;
  onProgress?: (ratio: number) => void;
  label: string;
}) {
  const v = FEATURE_VIDEOS[id];
  const player = useRef<PlayerRef>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Pilihan pengguna (jeda/putar manual) mengalahkan putar otomatis.
  const [userPaused, setUserPaused] = useState(false);
  const cb = useRef({ onEnded, onProgress });
  useEffect(() => {
    cb.current = { onEnded, onProgress };
  });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.35), { threshold: [0, 0.35, 0.7] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    const onPlay: CallbackListener<'play'> = () => setPlaying(true);
    const onPause: CallbackListener<'pause'> = () => setPlaying(false);
    const onEnd: CallbackListener<'ended'> = () => {
      setPlaying(false);
      cb.current.onEnded?.();
    };
    const onFrame: CallbackListener<'frameupdate'> = e => cb.current.onProgress?.(e.detail.frame / (v.duration - 1));
    p.addEventListener('play', onPlay);
    p.addEventListener('pause', onPause);
    p.addEventListener('ended', onEnd);
    p.addEventListener('frameupdate', onFrame);
    return () => {
      p.removeEventListener('play', onPlay);
      p.removeEventListener('pause', onPause);
      p.removeEventListener('ended', onEnd);
      p.removeEventListener('frameupdate', onFrame);
    };
  }, [id, v.duration]);

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    if (inView && autoPlay && !userPaused) p.play();
    else p.pause();
  }, [inView, autoPlay, userPaused, id]);

  const toggle = () => {
    const p = player.current;
    if (!p) return;
    if (p.isPlaying()) {
      p.pause();
      setUserPaused(true);
    } else {
      if (p.getCurrentFrame() >= v.duration - 1) p.seekTo(0);
      p.play();
      setUserPaused(false);
    }
  };

  return (
    <div ref={wrap} className="group relative aspect-video w-full overflow-hidden bg-[#f7f9ff]">
      <Player
        key={id}
        ref={player}
        component={v.component}
        durationInFrames={v.duration}
        fps={VIDEO_FPS}
        compositionWidth={VIDEO_WIDTH}
        compositionHeight={VIDEO_HEIGHT}
        style={{ width: '100%', height: '100%' }}
        loop={!onEnded}
        controls={false}
        clickToPlay={false}
        spaceKeyToPlayOrPause={false}
        moveToBeginningWhenEnded={false}
        numberOfSharedAudioTags={0}
        // Tanpa putar otomatis (mis. "kurangi gerakan"), tampilkan adegan inti sebagai poster.
        initialFrame={autoPlay ? 0 : Math.round(v.duration * 0.5)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? 'Jeda' : 'Putar'} video: ${label}`}
        className="absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-none"
      >
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full bg-ink/85 text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 md:h-20 md:w-20 ${playing ? 'scale-75 opacity-0 group-hover:opacity-0' : 'scale-100 opacity-100'}`}
        >
          <Play size={30} className="translate-x-0.5" fill="currentColor" aria-hidden />
        </span>
      </button>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:p-3.5">
        <button type="button" onClick={toggle} aria-label={playing ? 'Jeda' : 'Putar'} className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white">
          {playing ? <Pause size={16} fill="currentColor" aria-hidden /> : <Play size={16} fill="currentColor" aria-hidden />}
        </button>
        <button type="button" onClick={() => player.current?.requestFullscreen()} aria-label="Layar penuh" className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white">
          <Maximize2 size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
