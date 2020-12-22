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
   let data = {
      pnr_details: {
       //  pnr_number:"8432407249",
      
       // search bar stations 
      //  date time picker 
      //  train number 
      //  passenger add facility 

       boarding_station:{
            station_name:"New Delhi",
            station_code:"NDLS",
            time:"03:40",
            date:"20-12-20"
      },
      reservation_upto:{
        station_name:"ALLAHABAD",
        station_code:"ALLD",
        time:"01:40",
        date:"21-12-20"
      },
      train_name:"Prayagraj express",
      train_number:"021243",
      travel_time:"07:40",
      pass_info:[
        { current_status_details:"CNF B1 39" },
        { current_status_details:"CNF B1 40" }
      ]
    }
  }
  return {data:null, query:null}
   //  return  get_details_by_pnr(query.pnr)
   //  .then(data => {
   //     return { data, query }
   //  })
   //  .catch(err => {
   //     return { error: err }
   //  })
}


export default withRouter(TrainBooking);
