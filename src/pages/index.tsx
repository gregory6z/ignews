/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from './home.module.scss';
import { SubscribeButton } from './components/SubscribeButton';
import { stripe } from '../services/stripe';

interface HomeProps{
  product: {
    priceId:string;
    amount: number;
  }
}

export default function Home({ product }:HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news | Page d'accueil</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            👏 Bonjour, bienvenue
          </span>
          <h1>
            Nouveautés sur
            {' '}
            <br />
            le
            {' '}
            <span>React</span>
            {' '}
            world
          </h1>
          <p>
            Accéder à toutes les publications
            {' '}
            <br />

            <span>
              pour
              {' '}
              {product.amount}
              {' '}
              par mois
            </span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="girl coding" />

      </main>
    </>
  );
}

export const getServerSideProps:GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1IdUboB3tAmYigpYUY0xHJ5D');
  ['product'];

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('fr', {
      style: 'currency',
      currency: 'EUR',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
