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
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        exit={{ scale: 0 }}
        transition={{ times: [0.3, 0.5, 0.3], delay: 0.2 }}
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
