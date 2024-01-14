import React from 'react';
import { useCart } from '../Provider/CartContext';
import Header from '../comp/Header';

export default function YourComponent() {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, product) => {
    const productPrice = parseFloat(product.price) || 0;
    return acc + productPrice * product.quantity;
  }, 0);

  return (
    <div>
      <Header />
      {cart.map((product, index) => (
        <h2 key={index}>
          {product.title} - {(parseFloat(product.price) || 0).toFixed(2)} € x {product.quantity}
        </h2>
      ))}
      <p>Total Price: {totalPrice.toFixed(2)} €</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}