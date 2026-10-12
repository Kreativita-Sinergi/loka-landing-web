import { loadFont } from '@remotion/google-fonts/PlusJakartaSans';
import { Composition } from 'remotion';

import InstagramReel, { REEL_DURATION } from './InstagramReel';
import { FEATURE_VIDEOS, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from '../src/components/site/videos/registry';

// Di situs font datang dari next/font; saat render MP4 dimuat dari Google Fonts.
loadFont('normal', { weights: ['500', '600', '700', '800'], subsets: ['latin'] });

/** Studio & render: `npm run video:studio` atau `npm run video:render -- <id>`. */
export const RemotionRoot = () => (
  <>
    {Object.entries(FEATURE_VIDEOS).map(([id, v]) => (
      <Composition key={id} id={id} component={v.component} durationInFrames={v.duration} fps={VIDEO_FPS} width={VIDEO_WIDTH} height={VIDEO_HEIGHT} />
    ))}
    <Composition id="InstagramReel" component={InstagramReel} durationInFrames={REEL_DURATION} fps={VIDEO_FPS} width={1080} height={1920} />
  </>
);
