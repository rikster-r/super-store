import React, { useState, useEffect } from 'react';
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

function App() {
  const [cart, setCart] = useState(new Map());
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setItems(json);
      });
  }, []);

  const addCartItem = newItem => {
    let cartClone = new Map(cart);
    cartClone.set(newItem.id, { ...newItem, count: 1 });
    setCart(cartClone);
  };

  const increaseCartItemCount = id => {
    let cartClone = new Map(cart);
    cartClone.get(id).count++;
    setCart(cartClone);
  };

  const decreaseCartItemCount = id => {
    let cartClone = new Map(cart);

    if (cartClone.get(id).count === 1) {
      cartClone.delete(id);
    } else {
      cartClone.get(id).count--;
    }

    setCart(cartClone);
  };

  const removeCartItem = id => {
    let cartClone = new Map(cart);
    cartClone.delete(id);
    setCart(cartClone);
  };

  const clearCart = () => {
    setCart(new Map());
  };

  const handleCartControl = (id, effect) => {
    if (effect === 'add') {
      const newItem = items.find(item => item.id === id);
      addCartItem(newItem);
    } else if (effect === 'increase') {
      increaseCartItemCount(id);
    } else if (effect === 'decrease') {
      decreaseCartItemCount(id);
    } else if (effect === 'clear') {
      clearCart();
    } else if (effect === 'remove') {
      removeCartItem(id);
    }
  };

  return (
    <>
      <Header cart={cart}></Header>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop cart={cart} handleCartControl={handleCartControl} items={items} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} handleCartControl={handleCartControl} />}
          />
        </Routes>
      </AnimatePresence>
      <Footer></Footer>
    </>
  );
}

export default App;
