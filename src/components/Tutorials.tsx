"use client";

import React, { useRef, useState } from "react";
import { Play } from "lucide-react";
import { tutorialDetails } from "@/data/tutorials";
import { trackEvent } from "@/utils/analytics";

/**
 * Deretan kartu video tutorial (rekaman HP, portrait).
 * Video dimuat malas (preload none + poster) dan hanya satu yang
 * diputar pada satu waktu.
 */
const Tutorials: React.FC = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handlePlay = (slug: string) => {
    if (playing && playing !== slug) {
      videoRefs.current[playing]?.pause();
    }
    setPlaying(slug);
    videoRefs.current[slug]?.play();
    trackEvent("tutorial_play", { video: slug });
  };

  return (
    <div className="mt-12 overflow-x-auto pb-6 -mx-4 px-4">
      <div className="flex gap-5 min-w-max lg:min-w-0 lg:justify-center">
        {tutorialDetails.videos.map((video) => (
          <div
            key={video.slug}
            className="flex flex-col gap-3 w-[180px] md:w-[200px] flex-shrink-0"
          >
            <div className="bg-gray-900 rounded-[28px] p-[5px] shadow-xl ring-1 ring-gray-800">
              <div className="relative w-full aspect-[1080/2400] rounded-[24px] overflow-hidden bg-black">
                <video
                  ref={(el) => {
                    videoRefs.current[video.slug] = el;
                  }}
                  src={`/videos/tutorials/${video.slug}.mp4`}
                  poster={`/videos/tutorials/${video.slug}_poster.jpg`}
                  preload="none"
                  playsInline
                  controls={playing === video.slug}
                  onEnded={() =>
                    setPlaying((p) => (p === video.slug ? null : p))
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {playing !== video.slug && (
                  <button
                    type="button"
                    onClick={() => handlePlay(video.slug)}
                    aria-label={`Putar tutorial: ${video.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40">
                      <Play size={18} className="ml-0.5 fill-current" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
            </div>
            <div className="px-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{video.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed dark:text-gray-400">{video.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
