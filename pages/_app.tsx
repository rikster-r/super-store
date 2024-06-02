import '../styles/main.css';
import { useReducer, createContext } from 'react';
import Layout from '../components/Layout';
import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const cartReducer = (cart: Cart, action: cartAction) => {
  switch (action.type) {
    case 'add':
      return new Map([
        ...cart,
        [action.item._id, { ...action.item, count: 1 }],
      ]);
    case 'increase':
      return new Map(
        [...cart].map(([id, item]) =>
          id === action.item._id
            ? [id, { ...item, count: item.count + 1 }]
            : [id, item]
        )
      );
    case 'decrease':
      return new Map(
        [...cart].map(([id, item]) =>
          id === action.item._id
            ? [id, { ...item, count: item.count - 1 }]
            : [id, item]
        )
      );
    case 'remove':
      return new Map([...cart].filter(([id]) => id !== action.item._id));
    case 'clear':
      return new Map();
    default:
      return cart;
  }
};

type CartContextType = {
  cart: Cart;
  cartDispatch: React.Dispatch<cartAction>;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function MyApp({ Component, pageProps }) {
  const [cart, cartDispatch] = useReducer(cartReducer, new Map());

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </CartContext.Provider>
  );
}
