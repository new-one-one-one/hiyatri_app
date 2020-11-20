import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import Layout from '../../../components/Core/Layout';
import BookingList from '../../../components/Admin/Booking/bookingList';
import { order_list } from '../../../actions/order';
import Admin from '../../../components/Core/Protect/admin'


const Bookings = ({ list }) => {
  const [bookingList, setBookingList] = useState();
  const token = getCookie('token');

   useEffect(() => {
      order_list(token)
       .then(response => {
          setBookingList(response.response)
       })
       .catch((err) => {
         console.log(err)
       })
   },[])

  return  <>
           <Admin>
             <Layout>
               <BookingList list={bookingList} />
             </Layout>
           </Admin>
          </>
}


export default Bookings;
