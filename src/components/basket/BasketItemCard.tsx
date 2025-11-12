'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { imageUrl } from '@/lib/imageUrl';
import { BasketItem } from '@/types';

interface BasketItemCardProps {
  item: BasketItem;
  onQuantityChange: (
    productId: string,
    variantSize: string,
    quantity: number
  ) => void;
  onRemove: (productId: string, variantSize: string) => void;
}

const BasketItemCard: React.FC<BasketItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const router = useRouter();
  const { _id, name, slug, image } = item.product;
  const { price, size: variantSize, stock } = item.variant;

  const [liveStock, setLiveStock] = useState<number | null>(stock ?? null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch(`/api/stock?ids=${_id}`);
        const data = await res.json();
        const variantStock = data[_id]?.[variantSize] ?? 0;
        setLiveStock(variantStock);
      } catch (err) {
        console.error(`❌ Failed to fetch live stock for ${_id}:`, err);
      }
    };

    fetchStock();
    const interval = setInterval(fetchStock, 5000);
    return () => clearInterval(interval);
  }, [_id]);

  const getStockStatus = (stock?: number) =>
    typeof stock === 'number' && stock > 0 ? (
      <span className="font-semibold text-green-600">Available</span>
    ) : (
      <span className="font-semibold text-flag-red">Out of stock</span>
    );

  return (
    <div className="p-2 border-b">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/product/${slug?.current}`)}
      >
        <div className="flex justify-center items-center w-full h-[200px]">
          {image && (
            <Image
              src={imageUrl(image).url()}
              alt={name ?? 'Product Image'}
              width={150}
              height={150}
              className="object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center text-center p-1 gap-2">
        <h2 className="uppercase text-md font-semibold text-gray-800">
          {name} ({variantSize})
        </h2>
        <p className="font-light">|</p>
        <p className="text-sm font-light text-gray-800">
          ${(price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex justify-center mb-4 gap-2">
        <p className="text-xs font-light text-gray-600 my-2">
          {getStockStatus(liveStock ?? 0)}
        </p>

        <select
          value={item.quantity}
          onChange={(e) =>
            onQuantityChange(_id, variantSize, Number(e.target.value))
          }
          className="border text-xs w-full max-w-[60px] bg-white text-center text-gray-800"
          disabled={!liveStock || liveStock === 0}
        >
          {Array.from({ length: liveStock ?? 0 }, (_, i) => i + 1).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onRemove(_id, variantSize)}
          className="text-xs underline font-light text-gray-800 hover:text-red-600 transition"
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default BasketItemCard;
