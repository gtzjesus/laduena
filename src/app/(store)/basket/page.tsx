'use client';

import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

import Loader from '@/components/common/Loader';
import Header from '@/components/common/header';
import EmptyBasket from '@/components/basket/EmptyBasket';
import OrderSummary from '@/components/basket/OrderSummary';

import useBasketStore from '../../../../store/store';
import { useReservation } from '@/app/hooks/reservation/useReservation';
import BasketItemsList from '@/components/basket/BasketItemsList';

export default function BasketPage() {
  const { isSignedIn = false } = useAuth();
  const { user } = useUser();

  const groupedItems = useBasketStore((state) => state.getGroupedItems());

  const [isClient, setIsClient] = useState(false);

  const { isLoading, reservationError, handleReservation } = useReservation();
  console.log('Basket items:', groupedItems);

  useEffect(() => {
    setIsClient(true);

    if (
      isSignedIn &&
      user?.id &&
      sessionStorage.getItem('checkoutAfterLogin') === 'true'
    ) {
      sessionStorage.removeItem('checkoutAfterLogin');
      handleReservation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user]);

  if (!isClient) return <Loader />;
  if (groupedItems.length === 0) return <EmptyBasket />;

  const handleRemoveItem = (productId: string, variantSize: string) => {
    useBasketStore.getState().removeAllOfItem(productId, variantSize);
    sessionStorage.removeItem(productId);
  };

  const handleQuantityChange = (
    productId: string,
    variantSize: string,
    quantity: number
  ) => {
    useBasketStore
      .getState()
      .updateItemQuantity(productId, variantSize, quantity);
  };

  return (
    <div className="bg-red min-h-screen">
      <Header />

      <div className="w-full bg-flag-blue">
        <h1 className="uppercase text-sm font-light text-center p-5 text-white">
          bag
        </h1>
      </div>

      {reservationError && (
        <div className="bg-red-100 text-red-700 text-center p-4 text-xs uppercase">
          {reservationError}
        </div>
      )}

      <div className="container mx-auto w-full px-2 lg:px-2 grid grid-cols-1">
        <div className="col-span-2 pb-60">
          <BasketItemsList
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        </div>
        <OrderSummary
          isSignedIn={isSignedIn}
          isLoading={isLoading}
          onCheckout={handleReservation}
        />
      </div>
    </div>
  );
}
