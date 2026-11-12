export interface ProBusiness {
  name: string;
  image?: string;
  location?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.lokakasir.id';

/** Public identities only; the page remains available when the API is down. */
export async function fetchProBusinesses(): Promise<ProBusiness[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/pro-businesses?include=location`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const body = await res.json();
    if (body?.status !== true || !Array.isArray(body.data)) return [];

    return body.data.flatMap((item: unknown) => {
      if (!item || typeof item !== 'object' || !('name' in item) || typeof item.name !== 'string' || !item.name.trim()) return [];
      let image: string | undefined;
      if ('image' in item && typeof item.image === 'string' && item.image.trim()) {
        try {
          const url = new URL(item.image.trim());
          if (url.protocol === 'https:' || url.protocol === 'http:') image = url.href;
        } catch { /* Invalid logos use the shop name alone. */ }
      }
      const location = 'location' in item && typeof item.location === 'string' ? item.location.trim() || undefined : undefined;
      return [{ name: item.name.trim(), image, location }];
    });
  } catch {
    return [];
  }
}
