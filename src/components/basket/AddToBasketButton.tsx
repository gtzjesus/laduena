'use client';

import { Product, Variant } from '@/types'; // Import Variant type too
import useBasketStore from 'store/store';

type AddToBasketButtonProps = {
  product: Product;
  variant: Variant; // Use full Variant type here
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
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`w-full py-2 rounded-md text-white transition ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-flag-light-blue hover:bg-flag-blue-dark'
      }`}
    >
      Add to Bag
    </button>
  );
}
