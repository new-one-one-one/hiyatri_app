import Layout from '../../components/Core/Layout';
import Private from '../../components/Core/Private';
import { pnrDetails } from '../../actions/booking';
import { withRouter } from 'next/router';
import BookingComponent from '../../components/Booking';


const Booking = ({ data }) => {
  return <>
            <Layout>
               <Private>
                   <BookingComponent data={data} />
               </Private>
            </Layout>
         </>
}

Booking.getInitialProps = ({ query }) => {
    return  pnrDetails(query.pid)
    .then(value => {
       return { data: value}
    })
    .catch(err => {
       return console.log(err)
    })
}


export default withRouter(Booking);
