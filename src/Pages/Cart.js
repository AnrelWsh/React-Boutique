import React from 'react';
import styled from 'styled-components';
import { useCart } from '../Provider/CartContext';
import Header from '../comp/Header';
import { Link } from 'react-router-dom';

const CartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 25%;
`;

const Title = styled.h2`
  color: black;
  font-size: 18px;
  a{
    text-decoration: none;
  }
`;

const RemoveButton = styled.button`
  background-color: red;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  margin-top: 5px;

  &:hover {
    background-color: rgb(175, 13, 13);
  }
`;
export default function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();
 
  const totalPrice = cart.reduce((acc, product) => {
     const productPrice = parseFloat(product.price) || 0;
     return acc + productPrice * product.quantity;
  }, 0);
 
  return (
    <div>
      <Header/>
      <CartContainer>
        {cart.map((product, index) => (
          <CartItem key={index}>
            <Link to={`/products/${product.id}`}>
            <div>   
              <Title>
                {product.title} | {(parseFloat(product.price) || 0).toFixed(2)} € x {product.quantity}
              </Title>
            </div>
            <RemoveButton onClick={() => removeFromCart(product)}>Remove from Cart</RemoveButton>
            </Link>
          </CartItem>
        ))}
        </CartContainer>
        <p>Total Price: {totalPrice.toFixed(2)} €</p>
        <RemoveButton onClick={clearCart}>Clear Cart</RemoveButton>
     </div>
  );
 }
