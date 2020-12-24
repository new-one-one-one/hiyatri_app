import { get_user_bookings } from '../../../actions/order';
import Layout from '../../../components/Core/Layout';
import BookingsDisplay from '../../../components/Booking/allBookings';
import { withRouter } from 'next/router';

const UserAllBookings = ({data}) => {
    return (

            <Layout>
                 <BookingsDisplay data={data}/>
            </Layout>

            )

  }
UserAllBookings.getInitialProps = ({ query }) => {
    return  get_user_bookings(query.user_id)
    .then(data => {
       return { data }
    })
    .catch(err => {
       return console.log(err)
    })
  }

export default withRouter(UserAllBookings);
