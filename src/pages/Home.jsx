import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.scss';
import { motion } from 'framer-motion';

export default function Home() {
  useEffect(() => {
    document.body.className = 'blobs-active';

    return () => (document.body.classList = '');
  }, []);

  return (
    <main className="home">
      <motion.div
        className="info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="slogan">
          <h1>A Super Store</h1>
          <h1>for Super People</h1>
        </div>
        <Link to="/shop">
          <button className="btn btn-shop-start">Shop Now</button>
        </Link>
      </motion.div>
    </main>
  );
}
