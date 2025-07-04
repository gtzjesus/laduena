// lib/stripe/handleCheckoutSession.ts

import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import { backendClient } from '@/sanity/lib/backendClient';
import { Metadata } from 'actions/createCheckoutSession';
import { syncCustomerToSanity } from '@/sanity/lib/customers/syncCustomerToSanity';
import { decreaseProductStock } from '@/sanity/lib/products/decreaseProductStock';

/**
 * Handles a completed Stripe Checkout Session.
 * - Syncs customer to Sanity
 * - Records the order in Sanity
 * - Updates customer's order list and total spent
 * - Decreases product stock
 *
 * @param session Stripe Checkout Session object
 * @returns The created Sanity order document
 */
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, clerkUserId } = metadata as Metadata;

  // 🔁 Sync customer to Sanity
  const stripeCustomer = await syncCustomerToSanity(customer as string);

  // 🛒 Retrieve line items from the session
  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ['data.price.product'],
  });

  // 🧱 Convert Stripe products to Sanity references
  const sanityProducts = lineItems.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: 'reference',
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  // 🧾 Create the order document
  // 🧾 Create the order document
  const subtotal = (amount_total || 0) / 100;
  const tax = parseFloat((subtotal * 0.0825).toFixed(2)); // 8.25% tax

  const order = await backendClient.create({
    _type: 'order',
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    stripeCustomerId: customer,
    clerkUserId,
    customerName: stripeCustomer.name,
    email: stripeCustomer.email,
    currency,
    amountDiscount: (total_details?.amount_discount || 0) / 100,
    tax, // ✅ added tax field here
    products: sanityProducts,
    totalPrice: subtotal,
    status: 'paid',
    orderDate: new Date().toISOString(),
  });

  console.log('✅ Order synced to Sanity:', order);

  // 🔁 Patch the customer with the new order and increase totalSpent
  await backendClient
    .patch(stripeCustomer._id)
    .setIfMissing({ orders: [], totalSpent: 0 })
    .append('orders', [
      {
        _key: crypto.randomUUID(),
        _type: 'reference',
        _ref: order._id,
      },
    ])
    .inc({ totalSpent: order.totalPrice })
    .commit();

  console.log(`✅ Customer order list updated for: ${stripeCustomer._id}`);

  // 📉 Decrease product stock
  const items: Array<{ id: string; quantity: number }> = JSON.parse(
    session.metadata?.items || '[]'
  );

  for (const item of items) {
    const [productId, variantSize] = item.id.split('-');

    if (!productId || !variantSize) {
      throw new Error(`Invalid product id format: ${item.id}`);
    }

    await decreaseProductStock(productId, variantSize, item.quantity);
  }

  return order;
}
