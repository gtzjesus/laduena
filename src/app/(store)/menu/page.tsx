import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import ProductsView from '@/components/products/ProductsView';
import Header from '@/components/common/header';
import type { Metadata } from 'next';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export const metadata: Metadata = {
  title: 'Menu - La Dueña',
  description:
    'Explore the full menu at La Dueña – featuring snow cones, raspas, ice cream, and more sweet treats!',
  openGraph: {
    title: 'Menu - La Dueña',
    description:
      'Explore the full menu at La Dueña – featuring snow cones, raspas, ice cream, and more sweet treats!',
    url: 'https://laduena.store/menu',
    siteName: 'La Dueña',
    type: 'website',
  },
  alternates: {
    canonical: 'https://laduena.store/menu',
  },
};

export default async function MenuPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <>
      <div className="w-full bg-flag-blue pt-12">
        <Header />
      </div>

      <div className="container mx-auto">
        <ProductsView products={products} categories={categories} />
      </div>
    </>
  );
}
