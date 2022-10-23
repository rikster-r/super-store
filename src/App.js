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
  const [cart, setCart] = useState([]);

  const addCartItem = (newItem) => {
    let cartClone = [...cart];
    const existingItem = cartClone.find((item) => item.id === newItem.id);

    if (existingItem) {
      existingItem.count++;
    } else {
      cartClone.push(newItem);
    }

    setCart(cartClone);
  };

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={<Shop items={cart} addCartItem={addCartItem} />}
        />
        <Route
          path="/cart"
          element={<Cart items={cart} addCartItem={addCartItem} />}
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
