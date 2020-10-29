import Layout from '../../components/Core/Layout';
import Private from '../../components/Core/Private';
import { pnrDetails } from '../../actions/booking';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import BookingComponent from '../../components/Booking';
import BookingClass from '../../helpers/booking';

const TrainBooking = ({ data }) => {
const booking = new BookingClass();

  useEffect(() => {
   booking.addBooking(data);
  },[])

  return <>
            <Layout>
               <Private>
                   <BookingComponent data={booking.getBooking()}/>
               </Private>
            </Layout>
         </>
}

TrainBooking.getInitialProps = ({ query }) => {
    return  pnrDetails(query.pid)
    .then(value => {
       return { data: value}
    })
    .catch(err => {
       return console.log(err)
    })
}


export default withRouter(TrainBooking);
