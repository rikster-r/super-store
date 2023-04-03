import '../styles/Shop.scss';
import NewItemButton from '../components/NewItemButton';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const variants = {
  hidden: { opacity: 0 },
  show: {
    transition: {
      staggerChildren: 0.1,
    },
    opacity: 1,
  },
  close: { opacity: 0 },
};

export default function Shop({ cart, cartDispatch }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setItems(json);
      });
  }, []);

  return (
    <motion.main className="shop" variants={variants} initial="hidden" animate="show" exit="close">
      {items.map(item => {
        return (
          <motion.div key={item.id} className="item" variants={variants}>
            <div className="img-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.price}$</p>
            <NewItemButton cart={cart} item={item} cartDispatch={cartDispatch} removable={true} />
          </motion.div>
        );
      })}
    </motion.main>
  );
}
