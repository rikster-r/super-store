import '../styles/Shop.scss';
import NewItemButton from '../components/NewItemButton';
import { motion } from 'framer-motion';

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

export default function Shop({ cart, handleCartControl, items }) {
  return (
    <motion.main className="shop" variants={variants} initial="hidden" animate="show" exit="close">
      {items.map(item => {
        return (
          <motion.div key={item.id} data-id={item.id} className="item" variants={variants}>
            <div className="img-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.price}$</p>
            <NewItemButton
              cart={cart}
              id={item.id}
              handleCartControl={handleCartControl}
              removable="true"
            />
          </motion.div>
        );
      })}
    </motion.main>
  );
}
