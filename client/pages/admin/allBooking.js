
import AllBookings  from './../../components/Admin/allBookings';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import Layout from '../../components/Core/Layout';
import Private from '../../components/Core/Private';
import { get_all_bookings } from './../../actions/booking';

const fetachAllBookings = ({bookings}) => {

     return <>
              <Layout>
                <AllBookings data={bookings}/>
              </Layout>
            </>
}

export async function getStaticProps() {
return {
    props: {"bookings": await get_all_bookings()},
  }
}


export default fetachAllBookings;
