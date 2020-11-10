import React from 'react';
import Layout from '../components/Core/Layout';
import Homepage from '../components/Homepage'
import Booking from '../components/Admin'


const Home = () => {
  return <>
          <Layout>
             {/* <Homepage /> */}
             <Booking />
          </Layout>
         </>
}

export default Home;
