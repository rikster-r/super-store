import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shop from './pages/Shop';

import './styles/App.scss';
import './styles/reset.scss';

const cartReducer = (cart, action) => {
  switch (action.type) {
    case 'add':
      return new Map([...cart, [action.item.id, { ...action.item, count: 1 }]]);
    case 'increase':
      return new Map(
        [...cart].map(([id, item]) =>
          id === action.item.id ? [id, { ...item, count: item.count + 1 }] : [id, item]
        )
      );
    case 'decrease':
      return new Map(
        [...cart].map(([id, item]) =>
          id === action.item.id ? [id, { ...item, count: item.count - 1 }] : [id, item]
        )
      );
    case 'remove':
      return new Map([...cart].filter(([id]) => id !== action.item.id));
    case 'clear':
      return new Map();
    default:
      return cart;
  }
};

function App() {
  const [cart, cartDispatch] = useReducer(cartReducer, new Map());
  const location = useLocation();

  return (
    <>
      <Header cart={cart} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop cart={cart} cartDispatch={cartDispatch} />} />
          <Route path="/cart" element={<Cart cart={cart} cartDispatch={cartDispatch} />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
