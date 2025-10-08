import BasketItemCard from '@/components/basket/BasketItemCard';
import useBasketStore from 'store/store';

interface BasketItemsListProps {
  // Pass variantSize to the callbacks
  onQuantityChange: (
    productId: string,
    variantSize: string,
    quantity: number
  ) => void;
  onRemove: (productId: string, variantSize: string) => void;
}

export default function BasketItemsList({
  onQuantityChange,
  onRemove,
}: BasketItemsListProps) {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());

  return (
    <>
      {groupedItems.map((item) => (
        <BasketItemCard
          key={`${item.product._id}-${item.variant.size}`}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </>
  );
}
