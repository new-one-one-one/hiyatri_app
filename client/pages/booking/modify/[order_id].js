import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { single_order_by_id } from '../../../actions/order';
import { get_details_by_pnr } from '../../../actions/booking';
import BookingClass from '../../../helpers/booking';
import BookingComponent from '../../../components/Booking/BookNow';

const ModifyOrder = ({ data, query }) => {
  const booking = new BookingClass();
  const [order, setOrder] = useState();
  booking.addBooking(data)

  useEffect(() => {
     single_order_by_id(query.order_id)
       .then(response => {
           setOrder(response.response)
       })
       .catch((err) => {
         console.log(err)
       })
  },[])


  return <>
           <BookingComponent
               data={booking.getBooking()}
               query={query}
               modify={query.modify}
               order={order}  />
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
