import { useState, useEffect } from 'react';
import AddToBasketButton from '@/components/basket/AddToBasketButton';
import CartPopup from '../basket/CartPopUp';
import { Product, Variant } from '@/types'; // assuming you have Variant type

interface ProductClientProps {
  product: Product;
  isOutOfStock: boolean;
}

const ProductClient: React.FC<ProductClientProps> = ({
  product,
  isOutOfStock,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add this state to track selectedVariant
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    // On mount or product change, set default selected variant (e.g., first available)
    if (product.variants && product.variants.length > 0) {
      // Example: pick first variant in stock, or just first variant
      const available = product.variants.find((v) => (v.stock ?? 0) > 0);
      setSelectedVariant(available || product.variants[0]);
    }
  }, [product]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // If no variant selected or product out of stock, disable AddToBasketButton
  const disableAddToBasket = isOutOfStock || !selectedVariant;

  return (
    <div>
      <AddToBasketButton
        product={product}
        variant={selectedVariant!} // non-null assertion because we checked above
        onAddedToBag={openCart}
        disabled={disableAddToBasket}
      />

      {isCartOpen && <CartPopup onClose={closeCart} />}
    </div>
  );
};

export default ProductClient;
