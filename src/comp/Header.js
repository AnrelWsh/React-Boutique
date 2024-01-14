import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Provider/CartContext';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #333;
  padding: 10px;
  color: white;
  text-align: center;
`;

const HeaderLink = styled(Link)`
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const CartCount = styled.span`
  margin-left: 5px;
`;

export default function Header() {
  const { getTotalQuantity } = useCart();

  return (
    <HeaderContainer>
      <HeaderLink to="/">Home</HeaderLink>
      <HeaderLink to="/cart">
        Cart
        <CartCount>({getTotalQuantity()})</CartCount>
      </HeaderLink>
    </HeaderContainer>
  );
}