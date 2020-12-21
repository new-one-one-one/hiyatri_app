import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { single_order_by_id } from '../../../actions/order';
import { get_details_by_pnr } from '../../../actions/booking';
import BookingClass from '../../../helpers/booking';
import BookingComponent from '../../../components/Booking/BookNow';
import Layout from '../../../components/Core/Layout';
import Private from '../../../components/Core/Protect/private';

const ModifyOrder = ({ data, query }) => {
  const booking = new BookingClass();
  const [order, setOrder] = useState();
  booking.addBooking(data)

  useEffect(() => {
     single_order_by_id(query.order_id)
       .then(response => {
         console.log('modify_order', response.response)
           setOrder(response.response)
       })
       .catch((err) => {
         console.log(err)
       })
  },[])


  return <>
        <Private>
          <Layout>
           <BookingComponent
               data={booking.getBooking()}
               query={query}
               modify={query.modify}
               order={order}  />
         </Layout>
       </Private>
         </>
}

ModifyOrder.getInitialProps = ({ query }) => {
    return  get_details_by_pnr(query.pnr)
    .then(data => {
       return { data, query }
    })
    .catch(err => {
       return { error: err }
    })
}


export default withRouter(ModifyOrder);
