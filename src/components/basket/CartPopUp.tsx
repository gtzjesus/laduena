'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useBasketStore from 'store/store';
import { urlFor } from '@/sanity/lib/image';

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const cartItems = useBasketStore((state) => state.getGroupedItems());
  const hasItems = cartItems.length > 0;
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-50">
      {/* Basket popup panel */}
      <div
        ref={popupRef}
        style={{ backgroundImage: "url('/images/basket.webp')" }}
        className="bg-cover bg-center bg-no-repeat relative p-4 w-full h-[100vh] max-w-[100vw] lg:h-[100vh] lg:max-w-[625px] flex flex-col"
      >
        {/* Dark overlay INSIDE the popup panel */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0 rounded-md" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b py-2 px-2">
            <p className=" text-xl font-light text-white">
              {hasItems ? 'Added to bag' : 'Bag is empty'}
            </p>
            <button
              className="text-3xl text-white transition"
              onClick={onClose}
              aria-label="Close cart popup"
            >
              &times;
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-2">
            {hasItems &&
              cartItems.map((item, index) => (
                <div
                  key={`${item.product._id}-${index}`}
                  className="flex items-center gap-1 py-3 border-b border-flag-red"
                >
                  {/* Product Image */}
                  <div className="w-10 flex-shrink-0">
                    <Link href={`/product/${item.product.slug?.current || ''}`}>
                      <Image
                        src={
                          item.product.image
                            ? urlFor(item.product.image).url()
                            : '/fallback-image.jpg'
                        }
                        alt={item.product.name || 'Product'}
                        width={96}
                        height={96}
                        className="object-contain rounded"
                        priority
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="flex ">
                    <p className="uppercase text-sm font-semibold text-white"></p>
                    <p className="uppercase text-xs font-semibold text-white">
                      {item.product.category?.title ? (
                        <span className=" mr-2">
                          {item.product.category.title}
                        </span>
                      ) : null}
                      {item.product.name}
                    </p>

                    <p className="uppercase text-xs font-semibold text-white ml-2">
                      {item.variant?.size}
                    </p>
                    <p className="uppercase text-xs font-semibold text-white ml-2">
                      x{item.quantity}
                    </p>
                    <p className="uppercase text-xs font-bold text-white ml-2">
                      ${((item.variant?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            {/* Footer */}
            <div className="gap-2 mt-5 flex justify-center ">
              <Link
                href={hasItems ? '/basket' : '/search?q=*'}
                className=" bg-opacity-90 border border-flag-light-blue bg-flag-light-blue text-flag-red px-5 py-4 text-center  rounded-3xl text-xs font-bold transition duration-200 ease-in-out shadow-lg w-full max-w-[180px] hover:bg-opacity-100  drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
                onClick={onClose}
              >
                {hasItems ? 'Review Bag' : 'Start Adding Products to Bag'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
