/*


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



*/


import React from 'react';
import Layout from '../components/Core/Layout';
import EnterManually from './../components/Booking/BookNow/reEnterData';

const Home = () => {
    return <>
            <Layout>
                <EnterManually />
            </Layout>
           </>
  }
  
  export default Home;































