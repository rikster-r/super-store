import '../styles/reset.scss';
import '../styles/Home.scss';
import '../styles/Cart.scss';
import '../styles/Shop.scss';
import { useReducer, createContext } from 'react';
import Layout from '../components/Layout';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Item extends Product {
  count: number;
}

type Cart = Map<number, Item>;

type cartAction = {
  type: string;
  item?: Product;
};

const cartReducer = (cart: Cart, action: cartAction) => {
  switch (action.type) {
    case 'add':
      return new Map([...cart, [action.item.id, { ...action.item, count: 1 }]]);
    case 'increase':
      return new Map(
        [...cart].map(([id, item]) =>
          id === action.item.id
            ? [id, { ...item, count: item.count + 1 }]
            : [id, item]
        )
      );
    case 'decrease':
      return new Map(
        [...cart].map(([id, item]) =>
          id === action.item.id
            ? [id, { ...item, count: item.count - 1 }]
            : [id, item]
        )
      );
    case 'remove':
      return new Map([...cart].filter(([id]) => id !== action.item.id));
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
