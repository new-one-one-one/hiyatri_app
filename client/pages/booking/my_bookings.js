import { useEffect, useState } from 'react';
import { get_user_bookings } from '../../actions/order';
import { isAuth } from '../../actions/auth';
import Layout from '../../components/Core/Layout';
import BookingsDisplay from '../../components/Booking/MyBookings';
import Private from '../../components/Core/Protect/private';
import Head from 'next/head';

const head = () => (
      <Head>
          <title>
             {"My Bookings"} | {process.env.NEXT_PUBLIC_APP_NAME}
          </title>
       </Head>
  );

const UserAllBookings = () => {
  const [bookings, setBooking] = useState();

  useEffect(() => {
    let userId = isAuth() && isAuth()._id;
    get_user_bookings(userId)
    .then(data => {
        setBooking(data)
    })
    .catch(err => {
       return console.log(err)
    })
  },[])
    return <>
            {head()}
            <Private>
              <Layout>
                   {bookings && <BookingsDisplay data={bookings}/>}
              </Layout>
            </Private>
           </>

  }

  export default UserAllBookings;
