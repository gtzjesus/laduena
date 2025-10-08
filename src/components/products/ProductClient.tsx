'use client';

import { useState } from 'react';
import AddToBasketButton from '@/components/basket/AddToBasketButton';
import CartPopup from '@/components/basket/CartPopUp';
import { Product, Variant } from '@/types';
import VariantSelector from '@/components/variants/VariantSelector';

interface ProductClientProps {
  product: Product;
  isOutOfStock: boolean;
}

const ProductClient: React.FC<ProductClientProps> = ({
  product,
  isOutOfStock,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null); // ✅

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div>
      {/* Render the variant selector */}
      {product.variants?.length ? (
        <VariantSelector
          variants={product.variants}
          onVariantChange={setSelectedVariant}
        />
      ) : (
        <p>No variants available</p>
      )}

      {/* Render Add to Basket Button only if a variant is selected */}
      {selectedVariant && (
        <AddToBasketButton
          product={product}
          variant={selectedVariant}
          onAddedToBag={openCart}
          disabled={isOutOfStock}
        />
      )}

      {isCartOpen && <CartPopup onClose={closeCart} />}
    </div>
  );
};

export default ProductClient;
