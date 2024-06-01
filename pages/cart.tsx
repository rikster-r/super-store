import NewItemButton from '../components/NewItemButton';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useContext } from 'react';
import { CartContext } from '../pages/_app';
import { Trash2, Frown } from 'lucide-react';
import Image from 'next/image';
import { poppins } from '../pages/_app';

const variants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    transition: {
      staggerChildren: 0.1,
    },
    opacity: 1,
    y: 0,
  },
  close: { opacity: 0 },
};

export default function Cart() {
  const { cart, cartDispatch } = useContext(CartContext);

  return (
    <>
      <Head>
        <meta name="description" content="" />
        <title>SuperStore &bull; Checkout</title>
      </Head>
      <main className={`${poppins.className} cart`}>
        {cart.size ? (
          <>
            <h2>Your Cart</h2>
            <motion.ul
              className="cart-items"
              variants={variants}
              initial="hidden"
              animate="show"
              exit="close"
            >
              {Array.from(cart).map(([id, item]) => {
                return (
                  <motion.li
                    key={id}
                    data-id={id}
                    className="cart-item"
                    variants={variants}
                  >
                    <div className="img-wrapper">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill={true}
                        className="img"
                        priority={id < 4}
                        sizes="25vw"
                      />
                    </div>
                    <div>
                      <h2 className="item-title">{item.title}</h2>
                      <p>{(item.price * item.count).toFixed(2)}$</p>
                      <NewItemButton item={item} removable={false} />
                    </div>
                    <motion.button
                      className="btn btn-trash"
                      onClick={() => cartDispatch({ type: 'remove', item })}
                      whileHover={{
                        scale: 1.2,
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={24} />
                    </motion.button>
                  </motion.li>
                );
              })}
            </motion.ul>
            <div className="checkout">
              <p className="total">
                Total:{' '}
                {Array.from(cart.values())
                  .reduce((sum, item) => (sum += item.price * item.count), 0)
                  .toFixed(2)}
                $
              </p>
              <div className="btns">
                <button
                  onClick={() => cartDispatch({ type: 'clear' })}
                  className="btn btn-clear"
                >
                  Clear cart
                </button>
                <button className="btn btn-checkout">Checkout</button>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            className="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="cart-empty-text">
              <h2>Your cart is Empty!</h2>
              <Frown />
            </div>
            <Link href="/shop">
              <button className="btn btn-shop-start">Shop Now</button>
            </Link>
          </motion.div>
        )}
      </main>
    </>
  );
}
