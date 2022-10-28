import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import "./styles/App.scss";
import "./styles/reset.scss";

function App() {
  const [cart, setCart] = useState(new Map());

  const addCartItem = (newItem) => {
    let cartClone = new Map(cart);
    cartClone.set(newItem.id, { ...newItem, count: 1 });
    setCart(cartClone);
  };

  const increaseCartItemCount = (newItem) => {
    let cartClone = new Map(cart);
    cartClone.get(newItem.id).count++;
    setCart(cartClone);
  };

  const decreaseCartItemCount = (newItem) => {
    let cartClone = new Map(cart);

    if (cartClone.get(newItem.id).count === 1) {
      cartClone.delete(newItem.id);
    } else {
      cartClone.get(newItem.id).count--;
    }

    setCart(cartClone);
  };

  const handleNewItem = (newItem, effect) => {
    if (effect === "add") {
      addCartItem(newItem);
    } else if (effect === "increase") {
      increaseCartItemCount(newItem);
    } else if (effect === "decrease") {
      decreaseCartItemCount(newItem);
    }
  };

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={<Shop cart={cart} handleNewItem={handleNewItem} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} handleNewItem={handleNewItem} />}
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
