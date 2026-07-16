"use client";

import React, { useRef, useState } from "react";
import { Play, Clock } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
  MotionValue,
} from "framer-motion";
import { tutorialDetails, TutorialVideo } from "@/data/tutorials";
import { trackEvent } from "@/utils/analytics";

const containerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: { delayChildren: 0.15, staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  offscreen: { opacity: 0, y: 80, scale: 0.92 },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.9 },
  },
};

/** Offset parallax per kartu (px) — kartu tengah diam, tetangganya bergeser berlawanan. */
const PARALLAX_PATTERN = [60, -44, 0, -44, 60];

interface CardProps {
  video: TutorialVideo;
  parallaxY: MotionValue<number> | 0;
  playing: boolean;
  onPlay: () => void;
  onEnded: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}

const TutorialCard: React.FC<CardProps> = ({
  video,
  parallaxY,
  playing,
  onPlay,
  onEnded,
  videoRef,
}) => (
  <motion.div
    variants={cardVariants}
    style={{ y: parallaxY }}
    whileHover={{ y: -10, transition: { type: "spring", bounce: 0.4, duration: 0.5 } }}
    className="group flex flex-col gap-3 w-[180px] md:w-[200px] flex-shrink-0"
  >
    <div className="relative bg-gray-900 rounded-[28px] p-[5px] shadow-xl ring-1 ring-gray-800 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-blue-600/25 group-hover:ring-blue-500/40">
      <div className="relative w-full aspect-[1080/2400] rounded-[24px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={`/videos/tutorials/${video.slug}.mp4`}
          poster={`/videos/tutorials/${video.slug}_poster.jpg`}
          preload="none"
          playsInline
          controls={playing}
          onEnded={onEnded}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!playing && (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Putar tutorial: ${video.title}`}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-black/10 to-transparent transition-colors hover:bg-black/20"
          >
            <span className="relative flex h-12 w-12 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-blue-500/50 animate-ping [animation-duration:2s] group-hover:bg-blue-400/60" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40 transition-transform duration-300 group-hover:scale-110">
                <Play size={18} className="ml-0.5 fill-current" aria-hidden="true" />
              </span>
            </span>
            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              <Clock size={10} aria-hidden="true" /> {video.duration}
            </span>
          </button>
        )}
      </div>
    </div>
    <div className="px-1">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">{video.title}</p>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed dark:text-gray-400">{video.desc}</p>
    </div>
  </motion.div>
);

/**
 * Deretan kartu video tutorial (rekaman HP, portrait) dengan entrance
 * stagger + parallax saat scroll. Video dimuat malas (preload none +
 * poster) dan hanya satu yang diputar pada satu waktu.
 */
const Tutorials: React.FC = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: tiap kartu bergeser vertikal dengan kecepatan berbeda saat
  // section melintasi viewport; blob dekoratif bergerak berlawanan arah.
  const cardYs = [
    useTransform(scrollYProgress, [0, 1], [PARALLAX_PATTERN[0], -PARALLAX_PATTERN[0]]),
    useTransform(scrollYProgress, [0, 1], [PARALLAX_PATTERN[1], -PARALLAX_PATTERN[1]]),
    useTransform(scrollYProgress, [0, 1], [PARALLAX_PATTERN[2], -PARALLAX_PATTERN[2]]),
    useTransform(scrollYProgress, [0, 1], [PARALLAX_PATTERN[3], -PARALLAX_PATTERN[3]]),
    useTransform(scrollYProgress, [0, 1], [PARALLAX_PATTERN[4], -PARALLAX_PATTERN[4]]),
  ];
  const blobY = useTransform(scrollYProgress, [0, 1], [-130, 130]);

  const handlePlay = (slug: string) => {
    if (playing && playing !== slug) {
      videoRefs.current[playing]?.pause();
    }
    setPlaying(slug);
    videoRefs.current[slug]?.play();
    trackEvent("tutorial_play", { video: slug });
  };

  return (
    <div ref={sectionRef} className="relative mt-6">
      {/* Blob dekoratif dengan parallax berlawanan arah */}
      <motion.div
        aria-hidden="true"
        style={{ y: reducedMotion ? 0 : blobY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-400/15 via-cyan-400/10 to-blue-400/15 blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="overflow-x-auto py-16 -mx-4 px-4"
      >
        <div className="flex gap-5 min-w-max lg:min-w-0 lg:justify-center">
          {tutorialDetails.videos.map((video, i) => (
            <TutorialCard
              key={video.slug}
              video={video}
              parallaxY={reducedMotion ? 0 : cardYs[i]}
              playing={playing === video.slug}
              onPlay={() => handlePlay(video.slug)}
              onEnded={() => setPlaying((p) => (p === video.slug ? null : p))}
              videoRef={(el) => {
                videoRefs.current[video.slug] = el;
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Tutorials;
