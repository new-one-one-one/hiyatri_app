import Layout from '../../components/Core/Layout';
import Private from '../../components/Core/Protect/private';
import BookingComponent from '../../components/Booking/BookNow';
import BookingClass from '../../helpers/booking';
import Head from 'next/head';
import { get_details_by_pnr } from '../../actions/booking';
import { withRouter } from 'next/router';
import { getCookie } from '../../actions/auth';



  const head = () => (
        <Head>
            <title>
                {"Booking"} | {process.env.NEXT_PUBLIC_APP_NAME}
            </title>
         </Head>
    );


const TrainBooking = ({ data, query }) => {
  const booking = new BookingClass();
  booking.addBooking(data)
  return <>
           {head()}
           <Private>
             <Layout>
                {/* pnrWorked props is for finding out the working status */}
                <BookingComponent data={booking.getBooking()} query={query} pnrWorked = {false}/>
             </Layout>
           </Private>
         </>
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
