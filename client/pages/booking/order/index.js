import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import Layout from '../../../components/Core/Layout';
import Private from '../../../components/Core/Protect/private';
import { withRouter } from 'next/router';
import Order from '../../../components/Order';
import Head from 'next/head';
import Router from 'next/router';

const FinalOrder = () => {
  const [bookingData, setBookingData] = useState();
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
    let booking = bookingFromLS();
    if(!booking){
      return;
    }
    let new_state = booking.passenger_details.filter(pass => pass.selected == true)
    booking.passenger_details = new_state;
    setBookingData(booking)
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
              {bookingData && <Order data={bookingData} />}
            </Layout>
          </Private>
         </>
}

export default withRouter(FinalOrder);
