'use client';

import React, { useMemo } from 'react';
import { SignInButton } from '@clerk/nextjs';
import useBasketStore from 'store/store';

interface OrderSummaryProps {
  isSignedIn: boolean;
  isLoading: boolean;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  isSignedIn,
  isLoading,
  onCheckout,
}) => {
  const items = useBasketStore((state) => state.items);

  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.variant.price * item.quantity,
      0
    );
    return { totalItems, totalPrice };
  }, [items]);

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full 
        md:left-1/2 md:-translate-x-1/2
        md:w-[600px] 
        bg-flag-blue md:bg-gradient-to-b md:shadow-2xl
        text-white p-5 lg:p-8 z-40
        rounded-t-2xl
        transition-all duration-300
      "
    >
      {/* Header */}
      <h3 className="uppercase text-sm font-light text-center tracking-wide border-b border-white/20 pb-2">
        Bag Summary
      </h3>

      {/* Summary */}
      <div className="pt-3 space-y-2 text-xs lg:text-sm">
        <div className="flex justify-between font-light">
          <span className="opacity-90">Total fireworks</span>
          <span className="font-medium">{totalItems}</span>
        </div>

        <div className="flex justify-between font-light">
          <span className="opacity-90">
            Subtotal{' '}
            <span className="lowercase opacity-70">
              (estimated — pay at store)
            </span>
          </span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-3" />

      {/* Checkout / Sign-in */}
      {isSignedIn ? (
        <button
          onClick={onCheckout}
          disabled={isLoading || totalItems === 0}
          className={`
            mt-2 w-full py-3 text-sm uppercase rounded-md font-medium
            transition-all duration-300
            ${
              isLoading || totalItems === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-flag-light-blue hover:bg-flag-blue hover:shadow-[0_0_12px_rgba(56,189,248,0.6)]'
            }
          `}
        >
          {isLoading ? 'Reserving Fireworks...' : 'Reserve Fireworks'}
        </button>
      ) : (
        <div className="flex justify-center mt-2">
          <SignInButton mode="modal">
            <button
              className="
                w-full py-3 text-sm uppercase rounded-md font-medium
                bg-flag-light-blue hover:bg-flag-blue
                hover:shadow-[0_0_12px_rgba(56,189,248,0.6)]
                transition-all duration-300
              "
              onClick={() =>
                sessionStorage.setItem('checkoutAfterLogin', 'true')
              }
            >
              Check Out
            </button>
          </SignInButton>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
