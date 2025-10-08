'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { imageUrl } from '@/lib/imageUrl';
import { Product } from '@/types';
import { motion } from 'framer-motion';

type ProductImagesProps = {
  product: Product;
  isOutOfStock: boolean;
};

const ProductImages = ({ product, isOutOfStock }: ProductImagesProps) => {
  // Hooks always first
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Derive images after hooks
  const images = product.extraImages?.length
    ? product.extraImages
    : product.image
      ? [product.image]
      : [];
  // Register scroll listener once
  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;

    div.addEventListener('scroll', onScroll, { passive: true });

    return () => div.removeEventListener('scroll', onScroll);
  }, []);
  // Early return AFTER hooks
  if (!images.length) return null;

  // Scroll event handler
  const onScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const containerWidth = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / containerWidth);
    setCurrentIndex(index);
  };

  // Scroll to selected index function
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: containerWidth * index,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar ${
          isOutOfStock ? 'opacity-50' : ''
        }`}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-full max-w-full snap-center relative aspect-square overflow-hidden bg-custom-gray rounded-xl"
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

      {/* Buttons to navigate images */}
      <div className="flex justify-center mt-5 space-x-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-flag-blue' : 'bg-gray-400'
            }`}
            aria-label={`View image ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
