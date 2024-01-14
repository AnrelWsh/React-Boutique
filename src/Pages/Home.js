import React from 'react';
import { useGetProductsQuery } from '../Services/API';
import { Link } from 'react-router-dom';
import { useCart } from '../Provider/CartContext';
import styled from 'styled-components';
import Header from '../comp/Header';

export default function Home() {
  const { data, isFetching } = useGetProductsQuery();
  const { getTotalQuantity, cart } = useCart();

  const getProductQuantity = (productId) => {
    const productInCart = cart.find((item) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <div>
      <Header />
      <h1>Home</h1>
      {isFetching ? (
        <p>Fetching...</p>
      ) : (
        <div>
          <ProductsList getProductQuantity={getProductQuantity} />
        </div>
      )}
    </div>
  );
}
  
const AllProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 25%;
  a{
  text-decoration: none;
  color: black;
  }
`;

const ProductTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ProductPrice = styled.span`
  color: green;
`;

const QuantityInCart = styled.p`
  margin-top: 5px;
`;

const AddToCartButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  margin-top: 5px;

  &:hover {
    background-color: #2078b4;
  }
`;

export function ProductsList({ getProductQuantity }) {
  const { data, isFetching } = useGetProductsQuery();
  const { addToCart } = useCart();

  return (
    <div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <AllProducts>
          {data.map((product) => (
            <ProductContainer key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductTitle>
                  {product.title}
                </ProductTitle>
                <img src={product.image} width="150px"/>
                <ProductPrice>{product.price} €</ProductPrice>
              </Link>
              <QuantityInCart>Quantity in Cart: {getProductQuantity(product.id)}</QuantityInCart>
              <AddToCartButton
                onClick={() => {
                  addToCart({ title: product.title, price: parseFloat(product.price) || 0, id: product.id });
                }}
              >
                Add to Cart
              </AddToCartButton>
            </ProductContainer>
          ))}
        </AllProducts>
      )}
    </div>
  );
}