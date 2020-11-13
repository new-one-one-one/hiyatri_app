import Layout from '../../../components/Core/Layout';
import BookingList from '../../../components/Admin/Booking/bookingList';
import { order_list } from '../../../actions/order';


const Bookings = ({ list }) => {
  return  <Layout>
             <BookingList list={list} />
          </Layout>
}
Bookings.getInitialProps = () => {
  return order_list()
  .then(data => {
     return { list: data.response }
  })
  .catch(err => {
     return { error: err }
  })
}
export default Bookings;
