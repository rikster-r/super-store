import { Link, Outlet } from "react-router-dom";

export default function Header({ cart }) {
  return (
    <header>
      <Link to="/">
        <h1 className="title">Super Store</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">
              <button className="cart">
                <div className="cart-items-count">{cart.size}</div>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </header>
  );
}
