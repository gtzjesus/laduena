'use client';

import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { SanityImage, Category } from '@/types';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImage) {
  return builder.image(source);
}

function capitalizeFirstWord(text: string): string {
  const words = text.trim().split(' ');
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }
  return words.join(' ');
}

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full mx-auto bg-gradient-to-br from-flag-red via-transparent to-flag-red relative">
      <h2 className="barlow-condensed-regular text-lg  uppercase font-bold text-center text-black py-6">
        Browse Snack Action
      </h2>

      <div className="max-w-xl mx-auto relative">
        {/* ⬅️ Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-flag-red text-flag-blue p-2 "
          aria-label="Scroll left"
        >
          ◀
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-flag-red text-flag-blue p-2 "
          aria-label="Scroll right"
        >
          ▶
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide hide-scrollbar"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              className="flex-shrink-0 w-full sm:w-[100%] snap-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={`/categories/${category.slug.current}`}>
                <div className="flex flex-col items-center border-flag-blue p-40 overflow-hidden bg-flag-red">
                  <div className="relative w-full h-64">
                    <Image
                      src={
                        category.image
                          ? urlFor(category.image).url()
                          : '/default-image.jpg'
                      }
                      alt={category.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  <h3 className="barlow-condensed-regular text-xs lg:text-sm uppercase tracking-[0.05em] font-bold text-center text-black py-6">
                    {capitalizeFirstWord(category.title)}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
