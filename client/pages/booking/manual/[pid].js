import Layout from '../../../components/Core/Layout';
import Private from '../../../components/Core/Protect/private';
import BookingComponent from '../../../components/Booking/ManualBooking';
import BookingClass from '../../../helpers/booking';
import Head from 'next/head';
import { get_details_by_pnr } from '../../../actions/booking';
import { getCookie } from '../../../actions/auth';
import { withRouter } from 'next/router';



  const head = () => (
        <Head>
            <title>
                {"Booking"} | {process.env.NEXT_PUBLIC_APP_NAME}
            </title>
         </Head>
    );



const TrainBooking =  ({query, pnr}) => {
  
return <>
           {head()}
           <Private>
             <Layout>
                <BookingComponent  query={query} pnr={pnr}/>
             </Layout>
           </Private>
         </>
}


TrainBooking.getInitialProps = ({ query }) => {
  return {query, pnr: query.pnr}
}



export default withRouter(TrainBooking);
