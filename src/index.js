import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {  createBrowserRouter,  RouterProvider,} from "react-router-dom";

import Home from './Pages/Home';
import Products from './Pages/Products';
import Cart from './Pages/Cart';

import { Provider } from 'react-redux';
import { store } from './store';
import { CartProvider } from './Provider/CartContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/products/:id",
    element: <Products />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
      <RouterProvider router={router}> </RouterProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();