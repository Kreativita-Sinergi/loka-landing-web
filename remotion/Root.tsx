import { loadFont } from '@remotion/google-fonts/PlusJakartaSans';
import { Composition } from 'remotion';

import InstagramReel, { REEL_FEATURES, reelMeta, type ReelProps } from './InstagramReel';
import { FEATURE_VIDEOS, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from '../src/components/site/videos/registry';

// Di situs font datang dari next/font; saat render MP4 dimuat dari Google Fonts.
loadFont('normal', { weights: ['500', '600', '700', '800'], subsets: ['latin'] });

/** Studio & render: `npm run video:studio` atau `npm run video:render -- <id>`. */
export const RemotionRoot = () => (
  <>
    {Object.entries(FEATURE_VIDEOS).map(([id, v]) => (
      <Composition key={id} id={id} component={v.component} durationInFrames={v.duration} fps={VIDEO_FPS} width={VIDEO_WIDTH} height={VIDEO_HEIGHT} />
    ))}
    {/* Instagram: rangkuman Reels 9:16, feed 4:5, dan satu Reels per fitur. */}
    {([
      { id: 'InstagramReel', props: { format: 'reel' } },
      { id: 'InstagramFeed', props: { format: 'feed' } },
      ...REEL_FEATURES.map(f => ({ id: `Reel-${f}`, props: { format: 'reel', only: f } })),
    ] as { id: string; props: ReelProps }[]).map(({ id, props }) => (
      <Composition key={id} id={id} component={InstagramReel} defaultProps={props} fps={VIDEO_FPS} {...reelMeta(props)} />
    ))}
  </>
);
