import { useState, useEffect } from "react";
import "../styles/Shop.scss";

let CACHE = [];

export default function Shop({ cart, handleNewItem }) {
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

  const handleClick = (e) => {
    const clickedItemId = Number(e.target.closest(".item").dataset.id);
    const item = items.find((item) => item.id === clickedItemId);
    handleNewItem(item, e.target.dataset.effect);
  };

  return (
    <main className="shop">
      {items.map((item) => {
        return (
          <div key={item.id} data-id={item.id} className="item">
            <div className="img-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.price}$</p>
            <NewItemButton cart={cart} item={item} handleClick={handleClick} />
          </div>
        );
      })}
    </main>
  );
}

function NewItemButton({ cart, item, handleClick }) {
  if (cart.get(item.id) === undefined || cart.get(item.id).count === 0) {
    return (
      <div className="item-control">
        <button
          onClick={handleClick}
          data-effect="add"
          className="btn btn-item-control"
        >
          Add to cart
        </button>
      </div>
    );
  } else {
    return (
      <div className="item-control vertical">
        <button
          onClick={handleClick}
          data-effect="decrease"
          className="btn btn-item-control"
        >
          -
        </button>
        <span>{cart.get(item.id).count}</span>
        <button
          onClick={handleClick}
          data-effect="increase"
          className="btn btn-item-control"
        >
          +
        </button>
      </div>
    );
  }
}
