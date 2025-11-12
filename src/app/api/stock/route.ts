import { NextResponse } from 'next/server';
import { backendClient } from '@/sanity/lib/backendClient';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const idsParam = url.searchParams.get('ids');

  if (!idsParam) {
    return NextResponse.json({ error: 'Missing product IDs' }, { status: 400 });
  }

  const ids = idsParam.split(',').map((id) => id.trim());

  try {
    const products = await backendClient.fetch<
      { _id: string; variants: { size: string; stock: number }[] }[]
    >(
      `*[_type == "product" && _id in $ids]{
        _id,
        variants[]{ size, stock }
      }`,
      { ids }
    );

    // Build an object like { [productId]: { [size]: stock } }
    const stockMap: Record<string, Record<string, number>> = {};

    for (const p of products) {
      const variantStocks: Record<string, number> = {};
      for (const v of p.variants || []) {
        variantStocks[v.size] = v.stock ?? 0;
      }
      stockMap[p._id] = variantStocks;
    }

    return NextResponse.json(stockMap);
  } catch (err) {
    console.error('❌ Error fetching live stock:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
