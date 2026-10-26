import { loadFont } from '@remotion/google-fonts/PlusJakartaSans';
import { Composition } from 'remotion';

import InstagramReel, { REEL_FEATURES, reelMeta, type ReelProps } from './InstagramReel';
import Explainer, { EXPLAINER_IDS, explainerCalculateMetadata, explainerMeta, type ExplainerProps } from './Explainers';
import WhatsNewReel, { WHATS_NEW_FEATURES, whatsNewMeta, type WhatsNewProps } from './WhatsNewReel';
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
    {/* Update 1.40–1.46: rangkuman Reels 9:16, Threads/feed 4:5, dan satu Reels per fitur baru. */}
    {([
      { id: 'Update146-Reel', props: { format: 'reel' } },
      { id: 'Update146-Threads', props: { format: 'threads' } },
      ...WHATS_NEW_FEATURES.map(f => ({ id: `Update146-${f}`, props: { format: 'reel', only: f } })),
    ] as { id: string; props: WhatsNewProps }[]).map(({ id, props }) => (
      <Composition key={id} id={id} component={WhatsNewReel} defaultProps={props} fps={VIDEO_FPS} {...whatsNewMeta(props)} />
    ))}
    {/* Tiga konten penjelas (satu fitur per video), Reels 9:16 dan Threads 4:5. */}
    {EXPLAINER_IDS.flatMap((ex, i) =>
      (['reel', 'threads'] as const).map(format => {
        const props: ExplainerProps = { id: ex, format, audio: 'voice' };
        const cid = `Konten${i + 1}-${ex}-${format === 'reel' ? 'Reel' : 'Threads'}`;
        return <Composition key={cid} id={cid} component={Explainer} defaultProps={props} fps={VIDEO_FPS} {...explainerMeta(props)} calculateMetadata={explainerCalculateMetadata} />;
      }),
    )}
  </>
);
