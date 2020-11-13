import Layout from '../../components/Core/Layout';
import Private from '../../components/Core/Private';
import BookingComponent from '../../components/Booking';
import BookingClass from '../../helpers/booking';
import { get_details_by_pnr } from '../../actions/booking';
import { withRouter } from 'next/router';


const TrainBooking = ({ data, query }) => {
  const booking = new BookingClass();
  booking.addBooking(data)
  return <Layout>

            <BookingComponent data={booking.getBooking()} query={query}/>
     
         </Layout>
}

TrainBooking.getInitialProps = ({ query }) => {
    return  get_details_by_pnr(query.pnr)
    .then(data => {
       return { data, query }
    })
    .catch(err => {
       return { error: err }
    })
}


export default withRouter(TrainBooking);
