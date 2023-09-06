import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <AnimatePresence>{children}</AnimatePresence>
      <Footer />
    </>
  );
}
