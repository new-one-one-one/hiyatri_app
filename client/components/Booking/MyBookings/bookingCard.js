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
      switch (status){
          case "ASSIGN_TO_ADMIN": return (
                              <div className="row justify-content-center">
                                       <div className="col-5">
                                         <div className="row justify-content-center">
                                          <CancelModal id={id} duration={duration} />
                                         </div>
                                       </div>
                                       <div className="col-5">
                                         <div className="row justify-content-center">
                                            <Button id="user-booking-list-btn" onClick={()=>{showData(data)}} >View details</Button>
                                         </div>
                                       </div>
                                  </div>
                                  
                              )
          default:return(
            <div style={{marginLeft:"30%"}}>
              <Button id="user-booking-list-btn"  onClick={()=>{showData(data)}}>View details</Button>
            </div>
          )
       }
  }

return <div className="shadow booking-card">
        <Grid item>
            <Card className={classes.particularBooking}>
                <CardContent>
                        <Typography align="center" style={{letterSpacing:'0.1em',color:"#000066"}}  variant="body1">
                          <div>
                          <b>{booking.pnr_number}({allInfo.order_type})</b>
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
                            <Box width="50%">{boarding_station.date}</Box>
                        </Box>
                        <Box display="flex">
                            <Box width="40%"><b>Time</b></Box>
                            <Box width="10%"><b>:</b></Box>
                            <Box width="50%">{boarding_station.time}</Box>
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
              <DialogTitle id="form-dialog-title">Booking Details</DialogTitle>
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
