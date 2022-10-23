import { Link, Outlet } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Link to="/">
        <h1>Super Store</h1>
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
              <button>
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
