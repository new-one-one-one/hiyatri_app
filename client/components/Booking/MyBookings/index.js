import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

import BookingCard from './bookingCard';

const useStyles = makeStyles({
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
    const classes = useStyles();

    const display = (bookings) => {
        if(bookings !== undefined && bookings){
        return bookings.data && bookings.data.response && bookings.data.response.map((allInfo)=>{
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


    return (
        <div className="p-3">
          <h2 className="order-title">My Bookings </h2>
          <div className="row col justify-content-center">
            {display(data)}
          </div>
        </div>
    )
}

export default ShowAllBookings;
