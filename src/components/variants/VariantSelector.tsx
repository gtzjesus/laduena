'use client';

import React, { useState, useEffect } from 'react';

type Variant = {
  size: string;
  price: number;
  stock?: number;
};

type VariantSelectorProps = {
  variants: Variant[];
};

export default function VariantSelector({ variants }: VariantSelectorProps) {
  // Find the smallest available variant by price (or size if you want)
  const availableVariants = variants.filter((v) => (v.stock ?? 0) > 0);

  // Sort by price ascending (or you can sort by size if it's numeric)
  const sortedAvailableVariants = [...availableVariants].sort(
    (a, b) => a.price - b.price
  );

  // Default selected variant is the smallest price available or null
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    sortedAvailableVariants.length > 0 ? sortedAvailableVariants[0] : null
  );

  useEffect(() => {
    // In case variants change, reset selected variant accordingly
    if (sortedAvailableVariants.length > 0) {
      setSelectedVariant(sortedAvailableVariants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [variants]);

  const handleSelect = (variant: Variant) => {
    if ((variant.stock ?? 0) > 0) {
      setSelectedVariant(variant);
    }
  };

  const handleAddToBasket = () => {
    if (!selectedVariant) return;

    // TODO: Implement your add to basket logic here (e.g. call API, update context)
    alert(`Added ${selectedVariant.size} to basket!`);
  };

  return (
    <section className="bg-flag-red bg-opacity-10 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Available Sizes & Prices</h2>
      <ul className="flex flex-wrap gap-3 mb-4">
        {variants.map((variant, idx) => {
          const isAvailable = (variant.stock ?? 0) > 0;
          const isSelected = selectedVariant?.size === variant.size;

          return (
            <li
              key={idx}
              className={`cursor-pointer rounded-md border px-4 py-2 transition
                ${
                  isSelected
                    ? 'border-flag-blue bg-flag-blue text-white'
                    : isAvailable
                      ? 'border-flag-blue bg-white hover:bg-flag-blue hover:text-white'
                      : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
              title={
                isAvailable
                  ? `Size: ${variant.size} - $${variant.price.toFixed(2)}`
                  : 'Out of stock'
              }
              onClick={() => handleSelect(variant)}
              aria-disabled={!isAvailable}
              role="button"
              tabIndex={isAvailable ? 0 : -1}
            >
              <span className="font-medium">{variant.size}</span>{' '}
              <span>${variant.price.toFixed(2)}</span>
              {!isAvailable && (
                <span className="block text-xs italic">(Out of stock)</span>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        disabled={!selectedVariant}
        onClick={handleAddToBasket}
        className={`w-full py-2 rounded-md text-white ${
          selectedVariant
            ? 'bg-flag-blue hover:bg-flag-blue-dark'
            : 'bg-gray-400 cursor-not-allowed'
        } transition`}
      >
        Add {selectedVariant ? selectedVariant.size : ''} to Basket
      </button>
    </section>
  );
}
