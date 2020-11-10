
import AllBookings  from './../../components/Admin/allBookings';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import Layout from '../../components/Core/Layout';
import Private from '../../components/Core/Private';
import {makeStyles } from '@material-ui/core';
import {get_all_bookings} from './../../actions/booking';

const useStyles = makeStyles((theme) => ({
    
  }));

const fetachAllBookings = ({bookings}) => {
    const classes = useStyles();
     return <>
              <Layout>
                <AllBookings data={bookings}/>
              </Layout>
            </>
}


// this fucntionalioty I have used for the fetching of all the request from the servr 
// and it gets loaded as soon as the page is called 

export async function getStaticProps() {
return {
    props: {"bookings": await get_all_bookings()}, 
  }
}


export default fetachAllBookings;
