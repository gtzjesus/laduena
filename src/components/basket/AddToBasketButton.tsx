'use client';

import { Product, Variant } from '@/types';
import useBasketStore from 'store/store';

type AddToBasketButtonProps = {
  product: Product;
  variant: Variant;
  onAddedToBag: () => void;
  disabled?: boolean;
};

export default function AddToBasketButton({
  product,
  variant,
  onAddedToBag,
  disabled = false,
}: AddToBasketButtonProps) {
  const addItemToBasket = useBasketStore((state) => state.addItem);

  const handleClick = () => {
    if (disabled) return;

    addItemToBasket(product, variant);
    onAddedToBag();
    console.log('Adding to basket:', { product, variant });
  };

  return (
    <div className="fixed bottom-0 left-0  w-full z-50 bg-transparent px-4 py-3  ">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`w-full py-3 rounded-md text-white font-semibold transition ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-flag-light-blue hover:bg-flag-blue-dark'
        }`}
      >
        Add to Bag
      </button>
    </div>
  );
}
