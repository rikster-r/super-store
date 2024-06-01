import NewItemButton from '../components/NewItemButton';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { createClient } from 'next-sanity';
import Image from 'next/image';
import { poppins } from './_app';

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

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  close: { opacity: 0 },
};

export default function Shop({ products }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Browse our extensive catalog at Super Store. Find the latest products, best deals, and everything you need in one place."
        />
        <title>SuperStore &bull; Shop</title>
      </Head>
      <motion.main className={`${poppins.className} shop`}>
        {products.map((item, index) => (
          <motion.div
            key={item._id}
            className="item"
            variants={variants}
            initial="hidden"
            animate="show"
            exit="close"
          >
            <div className="img-wrapper">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill={true}
                className="img"
                priority={index < 8}
                sizes="50vw, (min-width: 500px) 33vw, (min-width: 1000px) 25vw"
              />
            </div>
            <h2 className="item-title">{item.title}</h2>
            <p className="item-price">{item.price}$</p>
            <NewItemButton item={item} removable={true} />
          </motion.div>
        ))}
      </motion.main>
    </>
  );
}
