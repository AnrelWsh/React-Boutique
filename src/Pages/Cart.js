import React from 'react';
import { useCart } from '../Provider/CartContext';

export default function YourComponent() {
  const { cart, clearCart } = useCart();

  return (
    <>
      {cart.map((product, index) => (
        <h2 key={index}>{product}</h2>
      ))}
      <button onClick={clearCart}>Clear Cart</button>
    </>
  );
}
