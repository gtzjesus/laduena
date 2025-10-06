'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ProductThumb from './ProductThumb';
import { Product } from '@/types';

function ProductGrid({ products }: { products: Product[] }) {
  // Break products into chunks of 2
  const chunkSize = 2;
  const chunks: Product[][] = [];

  for (let i = 0; i < products.length; i += chunkSize) {
    chunks.push(products.slice(i, i + chunkSize));
  }

  return (
    <div className="w-full flex justify-center flex-col space-y-4 max-w-2xl mx-auto">
      {chunks.map((chunk, index) => {
        // Every 3rd chunk (index 2, 5, 8, ...) shows only 1 product full width
        const isSingle = (index + 1) % 3 === 0;

        if (isSingle) {
          // Show only the first product in this chunk full width
          const product = chunk[0];
          return (
            <div
              key={`single-${product._id}`}
              className="grid grid-cols-1 gap-0 divide-x divide-y"
            >
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className=""
                >
                  <ProductThumb product={product} />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        } else {
          // Show all 2 products in a 4-column grid
          return (
            <div
              key={`chunk-${index}`}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-0 divide-x divide-y"
            >
              {chunk.map((product) => (
                <AnimatePresence key={product._id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=""
                  >
                    <ProductThumb product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
}

export default ProductGrid;
