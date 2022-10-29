import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import "./styles/App.scss";
import "./styles/reset.scss";

let CACHE = [];

function App() {
  const [cart, setCart] = useState(new Map());
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (CACHE.length) setItems(CACHE);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        CACHE = json;
        setItems(json);
      });
  }, []);

  const addCartItem = (newItem) => {
    let cartClone = new Map(cart);
    cartClone.set(newItem.id, { ...newItem, count: 1 });
    setCart(cartClone);
  };

  const increaseCartItemCount = (id) => {
    let cartClone = new Map(cart);
    cartClone.get(id).count++;
    setCart(cartClone);
  };

  const decreaseCartItemCount = (id) => {
    let cartClone = new Map(cart);

    if (cartClone.get(id).count === 1) {
      cartClone.delete(id);
    } else {
      cartClone.get(id).count--;
    }

    setCart(cartClone);
  };

  const removeCartItem = (id) => {
    let cartClone = new Map(cart);
    cartClone.delete(id);
    setCart(cartClone);
  };

  const clearCart = () => {
    setCart(new Map());
  };

  const handleCartControl = (id, effect) => {
    if (effect === "add") {
      const newItem = items.find((item) => item.id === id);
      addCartItem(newItem);
    } else if (effect === "increase") {
      increaseCartItemCount(id);
    } else if (effect === "decrease") {
      decreaseCartItemCount(id);
    } else if (effect === "clear") {
      clearCart();
    } else if (effect === "remove") {

      removeCartItem(id);
    }
  };

  return (
    <>
      <Header cart={cart}></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop
              cart={cart}
              handleCartControl={handleCartControl}
              items={items}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} handleCartControl={handleCartControl} />}
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
