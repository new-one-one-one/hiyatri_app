import {Card, Typography,ButtonGroup, CardContent,Button,Grid, CardActions,Box, Divider} from '@material-ui/core';
import CancelModal from './cancelModal';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'

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
        paddingLeft:"5%",
        paddingRight:"5%",
    }
  });

const BookingCard = ({ booking, allInfo, boarding_station, reservation_upto, is_arrival }) => {
  const classes = useStyles();
  let pickuptime = is_arrival?reservation_upto.date+" "+reservation_upto.time:
                    boarding_station.date+" " +boarding_station.time;
  let start = new Date(moment(Date.now()).format("YYYY-MM-DD h:mm"));
  let end = new Date(moment(pickuptime,"DD-MM-YYYY h:mm").format("YYYY-MM-DD h:mm"));
  const duration = moment(end).diff(moment(start),'hours');


  const myStatus= (status, id, pnr) => {
      switch (status){
          case "ASSIGN_TO_ADMIN": return (
                                  <div className="row justify-content-center">
                                       <div className="col-5">
                                         <div className="row justify-content-center">
                                           <Button
                                             className="mod-btn"
                                             onClick={() => Router.replace(`/booking/modify/${id}?pnr=${pnr}&pid=${is_arrival?"arrival":"departure"}&modify=${true}`)}>Modify</Button>
                                         </div>
                                       </div>
                                       <div className="col-5">
                                         <div className="row justify-content-center">
                                         <CancelModal id={id} duration={duration} />
                                         </div>
                                       </div>
                                  </div>
                              )
          case "COMPLETED": return (
                      <ButtonGroup fullWidth variant="contained">

                      </ButtonGroup>
          )
          case 'IN_PROGRESS':return (
                  <div>

                  </div>
          )
       }
  }


const statusStyle = (allInfo) => {
   if(allInfo.order_status === "ASSIGN_TO_ADMIN" || allInfo.order_status === "ASSIGN_TO_AGENT"){
     return { borderBottom: "4px solid #faad14" }
   }
   if(allInfo.order_status === "IN_PROGRESS"){
     return { borderBottom: "4px solid #d48806" }
   }
   if(allInfo.order_status === "COMPLETED"){
     return { borderBottom: "4px solid #a0d911" }
   }
   else{
     return { borderBottom: "4px solid #f5222d" }
   }
}

return <div className="shadow booking-card" style={statusStyle(allInfo)}>
        <Grid item>
                   <Card className={classes.particularBooking}>
                       <CardContent>
                               <Typography  variant="body1">
                                  <div className="text-center">
                                     {booking.booking_id} <b>({allInfo.order_type})</b>
                                  </div>
                               </Typography>
                               <Divider variant="fullWidth"/>
                               <Divider variant="fullWidth"/>
                               <Divider variant="fullWidth"/>
                               <br/>
                           <div className={classes.details}>
                               <Grid container xs={12} justify="space-between" alignItems="center">
                                   <Typography  variant="body2"  align="left">Date :</Typography>
                                   <Typography  variant="body2" align="right">{boarding_station.date}</Typography>
                               </Grid>
                               <Grid container xs={12} justify="space-between">
                                   <Typography  variant="body2"  align="left">Time : </Typography>
                                   <Typography  variant="body2" align="right">{boarding_station.time}</Typography>
                               </Grid>
                               <Grid container xs={12} justify="space-between">
                                   <Typography  variant="body2"  align="left">PNR Number :</Typography>
                                   <Typography  variant="body2" align="right">{booking.pnr_number}</Typography>
                               </Grid>
                               <Grid container xs={12} justify="space-between">
                                   <Typography  variant="body2"  align="left">STATUS :</Typography>
                                   <Typography  variant="body2" align="right">{allInfo.order_status}</Typography>
                               </Grid>
                           </div>
                       </CardContent>
                       <div>
                         {myStatus(allInfo.order_status,allInfo._id, booking.pnr_number)}
                       </div>
                   </Card>
           </Grid>
       </div>
}

export default BookingCard;
