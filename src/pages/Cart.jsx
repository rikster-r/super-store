import NewItemButton from "../components/NewItemButton";
import { Link } from "react-router-dom";
import "../styles/Cart.scss";

export default function Cart({ cart, handleCartControl }) {
  const handleClick = (e) => {
    const id = Number(e.target.closest("[data-id]")?.dataset?.id);
    handleCartControl(id, e.target.closest("button").dataset.effect);
  };

  return (
    <main className="cart">
      {cart.size ? (
        <>
          <h2>Your Cart</h2>
          <ul className="cart-items">
            {Array.from(cart).map(([id, item]) => {
              return (
                <li key={id} data-id={id} className="cart-item">
                  <div className="img-wrapper">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <h3 className="item-title">{item.title}</h3>
                    <p>{(item.price * item.count).toFixed(2)}$</p>
                    <NewItemButton
                      cart={cart}
                      id={id}
                      handleCartControl={handleCartControl}
                      removable="false"
                    />
                  </div>
                  <button
                    className="btn btn-trash"
                    onClick={handleClick}
                    data-effect="remove"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="checkout">
            <p className="total">
              Total:{" "}
              {Array.from(cart.values())
                .reduce((sum, item) => (sum += item.price * item.count), 0)
                .toFixed(2)}
              $
            </p>
            <div className="btns">
              <button
                onClick={handleClick}
                data-effect="clear"
                className="btn btn-clear"
              >
                Clear cart
              </button>
              <button className="btn btn-checkout">Checkout</button>
            </div>
          </div>
        </>
      ) : (
        <div className="info">
          <div className="slogan">
            <h2>Your cart is Empty!</h2>
            <i className="fa-regular fa-face-sad-tear"></i>
          </div>
          <Link to="/shop">
            <button className="btn btn-shop-start">Shop Now</button>
          </Link>
        </div>
      )}
    </main>
  );
}
