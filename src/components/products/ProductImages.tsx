'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { imageUrl } from '@/lib/imageUrl';
import { Product } from '@/types';
import { motion } from 'framer-motion';

type ProductImagesProps = {
  product: Product;
  isOutOfStock: boolean;
};

const ProductImages = ({ product, isOutOfStock }: ProductImagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = product.extraImages?.length
    ? product.extraImages
    : product.image
      ? [product.image]
      : [];

  if (!images.length) return null;

  return (
    <div className="w-full px-20">
      {/* Horizontal Swipeable Gallery (Snap Scroll) */}
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar ${
          isOutOfStock ? 'opacity-50' : ''
        }`}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-full max-w-full snap-center relative aspect-square  overflow-hidden "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Image
              src={imageUrl(image).width(800).height(800).url()}
              alt={`${product.name} image ${index + 1}`}
              fill
              className="object-contain transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 600px"
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
