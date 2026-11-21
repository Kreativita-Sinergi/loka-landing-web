import book from './fitur-aplikasi.json';

export const featureGuideGroups = book.groups;
export type FeatureGuide = (typeof featureGuideGroups)[number]['guides'][number];

export function featureGuideId(title: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `fitur-${slug}`;
}
