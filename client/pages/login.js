import React from 'react';
import Layout from '../components/Core/Layout';
import LoginComponent from '../components/Login/'
import Head from 'next/head';

  const head = () => (
        <Head>
            <title>
               {process.env.NEXT_PUBLIC_APP_NAME}
            </title>
         </Head>
    );

const Login = () => {
  return <>
          {head()}
          <Layout>
             <LoginComponent />
          </Layout>
         </>
}

export default Login;
