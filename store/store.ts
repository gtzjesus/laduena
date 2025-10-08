// store/store.ts

import { Product, BasketItem, Variant } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BasketState {
  items: BasketItem[];

  addItem: (product: Product, variant: Variant) => void;
  removeItem: (productId: string, variantSize: string) => void;
  removeAllOfItem: (productId: string, variantSize: string) => void;
  updateItemQuantity: (
    productId: string,
    variantSize: string,
    quantity: number
  ) => void;

  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string, variantSize: string) => number;
  getGroupedItems: () => BasketItem[];
  updateStockLevels: (latestStocks: { _id: string; stock: number }[]) => void;
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product._id === product._id &&
              item.variant.size === variant.size
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id &&
                item.variant.size === variant.size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, variant, quantity: 1 }],
          };
        }),

      removeItem: (productId: string, variantSize: string) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (
              item.product._id === productId &&
              item.variant.size === variantSize
            ) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
              // if quantity === 1, item is removed (not pushed)
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),

      // Fixed: now requires variantSize to remove the specific variant
      removeAllOfItem: (productId: string, variantSize: string) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product._id === productId &&
                item.variant.size === variantSize
              )
          ),
        })),

      // Fixed: accepts variantSize now
      updateItemQuantity: (
        productId: string,
        variantSize: string,
        quantity: number
      ) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId && item.variant.size === variantSize
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      clearBasket: () => {
        set({ items: [] });
        localStorage.removeItem('basket-store');
      },

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      // Fixed: now accepts variantSize, counts quantity of that variant only
      getItemCount: (productId: string, variantSize: string) => {
        const item = get().items.find(
          (item) =>
            item.product._id === productId && item.variant.size === variantSize
        );
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      updateStockLevels: (latestStocks) =>
        set((state) => ({
          items: state.items.map((item) => {
            const updatedStock = latestStocks.find(
              (prod) => prod._id === item.product._id
            )?.stock;

            if (updatedStock !== undefined) {
              return {
                ...item,
                product: {
                  ...item.product,
                  stock: updatedStock,
                },
                quantity: Math.min(item.quantity, updatedStock),
              };
            }

            return item;
          }),
        })),
    }),
    {
      name: 'basket-store',
    }
  )
);

export default useBasketStore;
