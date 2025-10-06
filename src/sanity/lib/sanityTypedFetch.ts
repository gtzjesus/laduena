// sanity/lib/typedFetch.ts
import { sanityFetch } from './live';
import { SanityQueryParams } from '@/types';

interface FetchOptions {
  query: string;
  params?: SanityQueryParams;
  tags?: string[];
}

export async function sanityTypedFetch<T>(options: FetchOptions): Promise<T> {
  const { query, params = {}, tags = [] } = options;

  const result = await sanityFetch({
    query,
    params,
    tags,
  });

  // Assuming result is { data: T }
  if ('data' in result) {
    return (result as { data: T }).data;
  }

  // Otherwise, just return result as T
  return result as T;
}
