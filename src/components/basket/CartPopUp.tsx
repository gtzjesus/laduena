'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useBasketStore from 'store/store';
import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const cartItems = useBasketStore((state) => state.getGroupedItems());
  const hasItems = cartItems.length > 0;
  const popupRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle smooth close
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // match the transition duration
  };

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-0 transition-opacity duration-300',
        {
          'bg-opacity-50': isVisible,
        }
      )}
    >
      <div
        ref={popupRef}
        style={{ backgroundImage: "url('/images/basket.webp')" }}
        className={clsx(
          'transform transition-all duration-300 ease-in-out bg-cover bg-center bg-no-repeat p-4 w-full h-[90vh] lg:h-[90vh] max-w-[100vw] lg:max-w-[625px] flex flex-col absolute bottom-0 left-0 right-0',
          {
            'translate-y-0 opacity-100': isVisible,
            'translate-y-full opacity-0': !isVisible,
          }
        )}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0 " />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b py-2 px-2">
            <p className="text-xl font-light text-white">
              {hasItems ? 'Added to bag' : 'Bag is empty'}
            </p>
            <button
              className="text-3xl text-white transition"
              onClick={handleClose}
              aria-label="Close cart popup"
            >
              &times;
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-2 space-y-4">
            {hasItems &&
              cartItems.map((item, index) => (
                <div
                  key={`${item.product._id}-${index}`}
                  className="flex justify-between gap-3 py-2 border-b border-flag-red items-center"
                >
                  {/* Left Side */}
                  <div className="flex gap-3 items-center w-2/3">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Link
                        href={`/product/${item.product.slug?.current || ''}`}
                      >
                        <Image
                          src={
                            item.product.image
                              ? urlFor(item.product.image).url()
                              : '/fallback-image.jpg'
                          }
                          alt={item.product.name || 'Product'}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                          priority
                        />
                      </Link>
                    </div>

                    <div className="flex flex-col text-white text-xs">
                      <p className="font-semibold uppercase">
                        {item.product.name}
                      </p>
                      {item.product.category?.title && (
                        <p className="text-gray-300 uppercase text-[10px]">
                          {item.product.category.title}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end text-white text-xs w-1/3">
                    {item.variant?.size && (
                      <span className="text-white text-xs mb-1">
                        {item.variant.size}
                      </span>
                    )}
                    <span className="text-white text-xs mb-1">
                      x{item.quantity}
                    </span>
                    <span className="text-white text-xs mb-1 font-semibold uppercase">
                      ${((item.variant?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

            {/* Footer */}
            <div className="mt-6 flex justify-center">
              <Link
                href={hasItems ? '/basket' : '/search?q=*'}
                className="bg-opacity-90 border border-flag-light-blue bg-flag-light-blue text-flag-red px-5 py-4 text-center rounded-3xl text-xs font-bold transition duration-200 ease-in-out shadow-lg w-full max-w-[180px] hover:bg-opacity-100 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
                onClick={handleClose}
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
