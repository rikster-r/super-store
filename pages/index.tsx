import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { createClient } from 'next-sanity';
import Image from 'next/image';
import { poppins } from './_app';
import Carousel from '../components/Carousel';

const client = createClient({
  projectId: 'hfyf85xv',
  dataset: 'production',
  apiVersion: '2022-09-06',
  useCdn: true,
});

export async function getStaticProps() {
  const products: Product[] = await client.fetch(`*[_type == "product"]`);

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
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
      <main className={`${poppins.className} home`}>
        <motion.div
          className="info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h1 className="slogan">
            <span>A Super Store</span>
            <span>for Super People</span>
          </h1>
          <Link href="/shop" className="btn btn-shop-start">
            Shop Now
          </Link>
        </motion.div>
      </main>
      <div className="bestsellers-carousel">
        <Carousel title="Bestsellers" items={products.slice(0, 6)} />
      </div>
    </>
  );
}
