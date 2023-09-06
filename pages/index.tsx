import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    document.body.classList.add('blobs-active');

    return () => document.body.classList.remove('blobs-active');
  }, []);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Shop the best deals at Super Store - your ultimate online shopping destination. Explore electronics, fashion, and more!"
        />
        <title>Super Store</title>
      </Head>
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
          <Link href="/shop" className="btn btn-shop-start">
            Shop Now
          </Link>
        </motion.div>
      </main>
    </>
  );
}
