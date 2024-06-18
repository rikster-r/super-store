import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { createClient } from 'next-sanity';
import { poppins } from './_app';
import Carousel from '../components/Carousel';
import motherboardShowcase from '../assets/motherboard_showcase.jpg';
import clothesShowcase from '../assets/clothes_showcase.jpg';
import earringsShowcase from '../assets/earrings_showcase.jpg';
import Image from 'next/image';

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
        <title>SuperStore</title>
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
      <section className="bestsellers-carousel">
        <Carousel title="Bestsellers" items={products.slice(0, 6)} />
      </section>
      <section className="categories">
        <h2 className="categories-title">Browse categories</h2>
        <div className="categories-container">
          <div className="categories-jewelry">
            <div className="img-wrapper">
              <Image
                src={earringsShowcase}
                alt="Earrings picture"
                fill={true}
                sizes="90vw, (min-width: 500px) 30vw"
                className="img"
              />
            </div>
          </div>
          <div className="categories-clothes">
            <div className="img-wrapper">
              <Image
                src={clothesShowcase}
                alt="Clothes picture"
                fill={true}
                sizes="90vw, (min-width: 500px) 30vw"
                className="img"
              />
            </div>
          </div>
          <div className="categories-tech">
            <div className="img-wrapper">
              <Image
                src={motherboardShowcase}
                alt="Motherboard picture"
                fill={true}
                sizes="90vw, (min-width: 500px) 30vw"
                className="img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
