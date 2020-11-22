import React from 'react';
import Layout from '../components/Core/Layout';
import Homepage from '../components/Homepage'
import Head from 'next/head';

  const head = () => (
        <Head>
            <title>
               {process.env.NEXT_PUBLIC_APP_NAME}
            </title>
         </Head>
    );

const Home = () => {
  return <>
          {head()}
          <Layout>
              <Homepage />
          </Layout>
         </>
}

export default Home;
