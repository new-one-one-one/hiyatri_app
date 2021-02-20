import {Card, Typography,ButtonGroup, CardContent,Button,Grid, CardActions,Box, Divider} from '@material-ui/core';
import CancelModal from './cancelModal';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { blue } from '@material-ui/core/colors';
import Details from '../../Order/summary';
import TakenServices from '../../Order/takenServices';
import { useState, useEffect } from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        marginTop:"100px",
        marginLeft:"10%",
        marginRight:"10%",
        minWidth: 300,
    },
    particularBooking:{
        marginBottom:"10%",
        // textAlign:"center",
        minWidth:"400px"
    },
    details:{
        paddingLeft:"17%",
        paddingRight:"10%",
    },
    view_detail:{
      backgroundColor:blue
    },
    actionArea:{
      marginLeft:"20px"
    }
  });


  
  

const BookingCard = ({ booking, allInfo, boarding_station, reservation_upto, is_arrival }) => {
  const classes = useStyles();
  const [open , setClose]=useState(false);
  const [thisDataOpen, setData]=useState();


  let pickuptime = is_arrival?reservation_upto.date+" "+reservation_upto.time:
                    boarding_station.date+" " +boarding_station.time;
  let start = new Date(moment(Date.now()).format("YYYY-MM-DD h:mm"));
  let end = new Date(moment(pickuptime,"DD-MM-YYYY h:mm").format("YYYY-MM-DD h:mm"));
  const duration = moment(end).diff(moment(start),'hours');


  const handleClose=()=>{
    setClose(false);
  }
  const showData=(data)=>{
    setData(data);
    setClose(true);
  }
  useEffect(()=>{
  },[thisDataOpen])
  const myStatus= (status, id, pnr, data) => {
          if ((status === "ASSIGN_TO_ADMIN") && (compare_date_time(fixedDetails)))
                      return (
                              <div className="row justify-content-center">
                                       <div className="col-5">
                                         <div className="row justify-content-center">
                                          <CancelModal id={id} duration={duration} />
                                         </div>
                                       </div>
                                       <div className="col-5" style={{marginRight:"40px"}}>
                                            <Button id="user-booking-list-btn" onClick={()=>{showData(data)}} >View details</Button>
                                       </div>
                                  </div>

                              )
          else 
            return(
              <div style={{marginLeft:"30%"}}>
                <Button id="user-booking-list-btn"  onClick={()=>{showData(data)}}>View details</Button>
              </div>
            )
      }
  

  const compare_date_time = (details) =>{
    var arr = {
      "01":"Jan", "02":"Feb", "03":"Mar","04":"Apr","05":"May","06":"June","07":"July","08":"Aug","09":"Sep","10":"Oct","11":"Nov","12":"Dec"
    };
      var month = arr[details.date[1]];
      var today = new Date().getTime();
      var onthatDay = new Date(details.date[2]+" "+month+" "+details.date[0]+" "+details.hrs+":"+details.mins).getTime();
      return (onthatDay-today)/3600000 >= 0 ? true : false ;
    
    }
  const fixedDetails={
    hrs:parseInt(!is_arrival?boarding_station.time.substring(0,2):reservation_upto.time.substring(0,2)),
    mins:parseInt(!is_arrival?boarding_station.time.substring(3):reservation_upto.time.substring(3)),
    date:(!is_arrival?boarding_station.date:reservation_upto.date).split("-")
  }


return <div className="shadow booking-card">
        <Grid item>
            <Card className={classes.particularBooking}>
                <CardContent>
                        <Typography align="center" style={{letterSpacing:'0.1em',color:"#000066"}}  variant="body1">
                          <div>
                          <b>PNR-{booking.pnr_number}({allInfo.order_type})</b>
                          </div>
                        </Typography>

                        <Divider variant="fullWidth"/>
                        <Divider variant="fullWidth"/>
                        <br/>
                    <div className={classes.details}>
                        <Box display="flex">
                            <Box width="40%"><b>Booking Id</b></Box>
                            <Box width="10%"><b>:</b></Box>
                            <Box width="50%">{booking.booking_id}</Box>
                        </Box>
                        <Box display="flex">
                            <Box width="40%"><b>Date</b></Box>
                            <Box width="10%"><b>:</b></Box>
                            <Box width="50%">{is_arrival?reservation_upto.date:boarding_station.date}</Box>
                        </Box>
                        <Box display="flex">
                            <Box width="40%"><b>Time</b></Box>
                            <Box width="10%"><b>:</b></Box>
                            <Box width="50%">{is_arrival?reservation_upto.time:boarding_station.time}</Box>
                        </Box>
                        <Box display="flex">
                            <Box width="40%"><b>Status</b></Box>
                            <Box width="10%"><b>:</b></Box>
                            <Box width="50%">{allInfo.order_status==="ASSIGN_TO_ADMIN"||allInfo.order_status==="ASSIGN_TO_AGENT"||allInfo.order_status==="COMPELETED" ? "Confirmed" : "Cancelled" }</Box>
                        </Box>
                    </div>
                </CardContent>
                <div className={classes.actionArea}>
                   {myStatus(allInfo.order_status,allInfo._id, booking.pnr_number, booking)}
                </div>

            </Card>
           </Grid>
           <Dialog open={open} style={{marginTop:"100px"}} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Booking Details(<b>Total Cost</b>  =  ₹{booking.total_amount})</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {thisDataOpen && <Details data={thisDataOpen}/>}
                  { thisDataOpen!==undefined &&<TakenServices data={{porter_service_detail : thisDataOpen.porter_service.porter_service_detail, cab_service_detail:thisDataOpen.cab_service.cab_service_detail}}/>}
                
                </DialogContentText>

              </DialogContent>
                
                <DialogActions>
                <Button onClick={handleClose} variant="outlined"  id="users-cancel-booking-design">
                          Close
                        </Button>
                </DialogActions>
               
          </Dialog>
       </div>
}

export default BookingCard;
