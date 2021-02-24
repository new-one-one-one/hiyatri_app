import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Loader from 'react-loader-spinner'

import BookingCard from './bookingCard';
import { Dialog } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { DialogContent ,Icon,Box,Button} from "@material-ui/core";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

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
    const [loader, setLoader] = useState(true);
    const classes = useStyles();

  useState(() => {
  if(data){
    setLoader(false)
  }
  }, [])
    const display = (bookings) => {
        if(bookings !== undefined && bookings){
        return bookings.data && bookings.data.response && bookings.data.response.map((allInfo, i)=>{
            const booking = allInfo.booking;
            const {boarding_station, reservation_upto,is_arrival} = booking.booking_information;
           return (

              <BookingCard
                  booking={booking}
                  allInfo={allInfo}
                  boarding_station={boarding_station}
                  reservation_upto={reservation_upto}
                  is_arrival={is_arrival}
                  key={i}
                  />
          )
        })
       }
    }

console.log(loader)
    return (
      <>
        <div className="hp-loader">
        <Loader
            type="Oval"
            color="#00bcd4"
            height={150}
            width={150}
            visible={loader}
         />
        </div>
        <div className="p-3">
          <h2 className="order-title">My Bookings </h2>
          <div className="row col justify-content-center">
            {display(data)}
          </div>
        </div>
        
     </>
    )
}

export default ShowAllBookings;
