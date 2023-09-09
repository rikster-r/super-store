import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../pages/_app';
import { ShoppingCart } from 'lucide-react';
import { poppins } from '../pages/_app';

export default function Header() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <header className={`header-container ${poppins.className}`}>
        <div className="header">
          <Link href="/">
            <h1 className="title">Super Store</h1>
          </Link>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/cart" className="btn btn-cart">
                  <ShoppingCart size={20} />
                  <div className="cart-items-count">{cart.size}</div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
