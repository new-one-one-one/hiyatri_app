import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Card, Typography,ButtonGroup, CardContent,Button,Grid, CardActions,Box, Divider} from '@material-ui/core';

import BookingCard from './bookingCard';

const useStyles = makeStyles({
    root: {
        marginTop:"100px",
        marginLeft:"10%",
        marginRight:"10%",
        minWidth: 300,
    },
    particularBooking:{
        marginBottom:"5%",
        // textAlign:"center",
        minWidth:"300px"
    },
    details:{
        position:"center",
        paddingLeft:"15%",
        paddingRight:"15%",
    }
  });



const ShowAllBookings = (data) =>{
    const display= (bookings)=>{
        if(bookings!==undefined && bookings){
        return bookings.data.response.map((allInfo)=>{
            const booking = allInfo.booking;
            const {boarding_station, reservation_upto,is_arrival} = booking.booking_information;
           return (
              <BookingCard
                  booking={booking}
                  allInfo={allInfo}
                  boarding_station={boarding_station}
                  reservation_upto={reservation_upto}
                  is_arrival={is_arrival}
                  />
        )
    })
    }
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container xs={12} spacing={4}>
                {display(data)}
            </Grid>
        </div>
    )
}

export default ShowAllBookings;
