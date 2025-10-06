import { defineQuery } from 'next-sanity';
import { sanityTypedFetch } from '../sanityTypedFetch'; // ✅ use the wrapper
import { Product } from '@/types';

const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == 'product'] | order(name asc){
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    slug,
    price,
    image{
      _type,
      asset->{
        _ref,
        _type,
        url
      }
    },
    category->{
      title,
      slug
    }
  }
`);

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    // This should return the array of products directly
    const products = await sanityTypedFetch<Product[]>({
      query: ALL_PRODUCTS_QUERY,
    });

    // Just in case sanityTypedFetch returns undefined/null
    return products ?? [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};
