import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import Layout from '../../../components/Core/Layout';
import Private from '../../../components/Core/Protect/private';
import { withRouter } from 'next/router';
import Order from '../../../components/Order';
import Head from 'next/head';
import Router from 'next/router';

const FinalOrder = () => {
  const [data, setData] = useState();
  const token = getCookie('token');

  const bookingFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("Booking")) {
      return JSON.parse(localStorage.getItem("Booking"));
    } else {
      return false;
    }
  };

  useEffect(() => {
   setData(bookingFromLS())
  },[])

  const head = () => (
        <Head>
            <title>
                {"Booking payment"} | {process.env.NEXT_PUBLIC_APP_NAME}
            </title>
         </Head>
    );

  return <>
          {head()}
          <Private>
            <Layout>
              {data && <Order data={data} />}
            </Layout>
          </Private>
         </>
}


export default withRouter(FinalOrder);
