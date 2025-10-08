'use client';

import React, { useState, useEffect } from 'react';
import { Variant } from '@/types'; // ✅ Use the global Variant type

type VariantSelectorProps = {
  variants: Variant[];
  onVariantChange: (variant: Variant) => void;
};

export default function VariantSelector({
  variants,
  onVariantChange,
}: VariantSelectorProps) {
  const availableVariants = variants.filter((v) => v.stock > 0);
  const sortedAvailableVariants = [...availableVariants].sort(
    (a, b) => a.price - b.price
  );

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    sortedAvailableVariants.length > 0 ? sortedAvailableVariants[0] : null
  );

  useEffect(() => {
    if (selectedVariant) {
      onVariantChange(selectedVariant);
    }
  }, [selectedVariant, onVariantChange]);

  useEffect(() => {
    if (sortedAvailableVariants.length > 0) {
      setSelectedVariant(sortedAvailableVariants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [variants]);

  const handleSelect = (variant: Variant) => {
    if (variant.stock > 0) {
      setSelectedVariant(variant);
      onVariantChange(variant); // ✅ Ensure update fires
    }
  };

  return (
    <section className="bg-flag-red bg-opacity-10 rounded-lg p-4">
      <ul className="flex flex-col gap-3 mb-4">
        {variants.map((variant, idx) => {
          const isAvailable = variant.stock > 0;
          const isSelected = selectedVariant?.size === variant.size;

          return (
            <li
              key={idx}
              className={`cursor-pointer rounded-lg border px-4 py-6 transition
                ${
                  isSelected
                    ? 'border-flag-light-blue border-2 bg-white'
                    : isAvailable
                      ? 'border-gray-300 bg-white'
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
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-sm">{variant.size}</span>
                <span className="font-light text-xs">
                  ${variant.price.toFixed(2)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
