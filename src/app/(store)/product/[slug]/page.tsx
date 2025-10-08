import Header from '@/components/common/header';
import ProductImages from '@/components/products/ProductImages';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { notFound } from 'next/navigation';
import { imageUrl } from '@/lib/imageUrl';
import type { Metadata } from 'next';
import ProductClient from '@/components/products/ProductClient';

export const dynamic = 'force-static';
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | La Dueña',
      description: 'Sorry, this product does not exist.',
    };
  }

  const fallbackDescription =
    product.description?.slice(0, 150) ||
    'Browse our delicious items at La Dueña.';

  const productImageUrl = product.image
    ? imageUrl(product.image).width(1200).height(630).url()
    : '/default-og.jpg';

  return {
    title: `${product.name} | La Dueña`,
    description: fallbackDescription,
    openGraph: {
      title: `${product.name} | La Dueña`,
      description: fallbackDescription,
      images: [
        {
          url: productImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | La Dueña`,
      description: fallbackDescription,
      images: [productImageUrl],
    },
    alternates: {
      canonical: `https://laduena.store/products/${product.slug?.current}`,
    },
  };
}

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="min-h-screen">
      <Header />

      <div className="w-full bg-flag-blue">
        <h1 className="uppercase text-sm font-light text-center p-4 text-flag-red">
          {product.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-flag-blue max-w-7xl mx-auto px-4 py-8">
        <div className="relative flex flex-col space-y-6">
          <ProductImages product={product} isOutOfStock={isOutOfStock} />

          {/* The interactive client component */}
          <ProductClient product={product} isOutOfStock={isOutOfStock} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
