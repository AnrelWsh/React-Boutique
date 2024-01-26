import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.title === product.title
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const removeFromCart = (product) => {
    const existingProductIndex = cart.findIndex(
       (item) => item.title === product.title
    );
   
    if (existingProductIndex !== -1 && cart[existingProductIndex].quantity > 1) {
       const updatedCart = [...cart];
       updatedCart[existingProductIndex].quantity -= 1;
       setCart(updatedCart);
    } else if (existingProductIndex !== -1) {
       const updatedCart = cart.filter(
         (item) => item.title !== product.title
       );
       setCart(updatedCart);
    }
   };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, getTotalQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
