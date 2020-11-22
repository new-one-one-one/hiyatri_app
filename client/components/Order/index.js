import { useState } from 'react';
import {Paper} from "@material-ui/core";
import TrainIcon from '@material-ui/icons/Train';
import FilterListIcon from '@material-ui/icons/FilterList';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import useWindowSize from '../../helpers/windowDimension';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Height } from "@material-ui/icons";
import { getCookie, isAuth,removeLocalStorage } from "../../actions/auth";
import { withStyles } from "@material-ui/core/styles";
import {Grid,FormControlLabel,Box,Button,TextField,List,Avatar,ListItemText,ListItemAvatar,ListItem,CardContent,Typography,Divider} from "@material-ui/core";
import {IconButton,AppBar,Toolbar,Menu,MenuItem} from "@material-ui/core";
import { create_order, verify_order } from '../../actions/order';
import CssBaseline from '@material-ui/core/CssBaseline';
import OrderConfirmation from './orderConfirmation';
import useStyles from './style';


const AquaBlueCheckBox = withStyles({
  root: {
    '&$checked': {
      color: "aqua",
    },

  },
  checked: {},
})(CheckboxProps => <Checkbox color="default" />);

const FinalOrder = ({ data }) => {
const token = getCookie('token');
const { width } = useWindowSize();
const classes = useStyles();
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState();
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
const handleMobileMenuClose = () => {setMobileMoreAnchorEl(null);};
const handleMobileMenuOpen = (event) => { setMobileMoreAnchorEl(event.currentTarget) };
const [orderStatus, setorderStatus] = useState({
  status:"",
  show: false
});

const order = (e) => {
    e.preventDefault()
    create_order(data)
       .then(response => {
         if(response.error){
           return console.log(response.error)
         }
         console.log(response)
         paymentHandler(response._id)
       })
       .catch((err) => {
         console.log(err)
       })
}


const paymentHandler = (orderId) => {
    const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    amount: 100,
    currency: 'INR',
    name: 'Payments',
    order_id: orderId,
    prefill: {
      contact: isAuth() && isAuth().mobile,
      email: isAuth() && isAuth().email
    },
    theme: {
    color: '#2a306c',
    },
    "modal": {
    "ondismiss": function(){
         window.location.replace("/");
     }
},
    handler(response) {
     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
      verify_order({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
       .then(result => {
         if(result.error){
           return console.log(result.error)
         }
         if(result.status === "ok"){
           removeLocalStorage("Booking")
           return setorderStatus({ ...orderStatus, status:"successfull", show: true});
         }
         setorderStatus({ ...orderStatus, status:"failed", show: true});
       })
       .catch((err) => {
         console.log(err)
       })
    }
  }
    const razorpay = new window.Razorpay(options);
    razorpay.open()
}



const showPassengers = () => {
     return data.passenger_details.map((item, i) => {
       return <div className={classes.outerPass}>
               <div className={classes.outerDetails}>
               <Grid container xs={12} justify="space-between">
               <Typography  variant="body1" align="left">
                 {item.passenger_name}
               </Typography>
               <Typography  variant="body1" align="right">
                 Rs.580
               </Typography>
               </Grid>
               </div>
               <Divider/>
               <div className={classes.innerDetails} >
                 <Grid container xs={12} justify="space-between" className="p-1">
                     <Typography  variant="body2"  align="left">
                        {item.meet_and_greet?"Meet & Greet":""}
                     </Typography>
                     <Typography  variant="body2" align="right">
                      {item.meet_and_greet?"Rs. 500":""}
                     </Typography>
                 </Grid>
                 <Grid container xs={12} justify="space-between" className="p-1">
                     <Typography  variant="body2"  align="left">
                        {item.wheel_chair?"Wheel Chair":""}
                     </Typography>
                     <Typography  variant="body2" align="right">
                       {item.wheel_chair?"Rs. 500":""}
                     </Typography>
                 </Grid>
                 <Grid container xs={12} justify="space-between" className="p-1">
                     <Typography  variant="body2"  align="left">
                        {item.golf_cart?"Golf cart":""}
                     </Typography>
                     <Typography  variant="body2" align="right">
                      {item.golf_cart?"Rs. 500":""}
                     </Typography>
                 </Grid>
               </div>
              </div>
     })
}


return  <>
     <CssBaseline />
    {orderStatus.show ? <OrderConfirmation status={orderStatus}/>:
      <>
     <div className="order-container">
      <h1>ORDER DETAILS</h1>
      <h5>Summary</h5>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
               <Paper className={classes.orderFull}>
                        <br />
                        <Box className={classes.headingPart} p={2}>
                            <Typography>
                              Meeting Services
                            </Typography>
                        </Box>
                        <Paper variant="outlined" className={classes.particularOrder}>
                            <Grid container spacing={1}>
                                   <Grid container spacing={3}>
                                        <Grid  item xs={4} className="pl-4">
                                           <b> Meeting Station</b>
                                        </Grid>
                                        <Grid  item xs={4}>
                                           <b>{`Time of ${data.booking_information.is_arrival?"arrival":"departure"}`}</b>
                                        </Grid>
                                        <Grid  item xs={4}>
                                           <b> Number of passengers </b>
                                       </Grid>
                                   </Grid>
                                   <Grid container spacing={1}>
                                        <Grid item xs={4} className="pl-4">
                                           {data.booking_information.is_arrival?data.booking_information.reservation_upto.station_name:
                                            data.booking_information.boarding_station.station_name}
                                        </Grid>
                                        <Grid  item xs={2}>
                                           <Typography align="center">
                                           {data.booking_information.is_arrival?data.booking_information.reservation_upto.time:
                                            data.booking_information.boarding_station.time}
                                           </Typography>
                                        </Grid>
                                        <Grid  item xs={4}>
                                          <Typography align="right">
                                            {data.passenger_details.length}
                                          </Typography>
                                        </Grid>
                                  </Grid>
                            </Grid>
                        </Paper>
                        <Paper variant="outlined" className="p-3">
                           {showPassengers()}
                        </Paper>
                        <br />
                        </Paper>
                        <br/>
                        {/*<Paper className={classes.Services}>
                                <Box className={classes.headingPart} p={1}>
                                  <Typography>
                                    Other Services
                                  </Typography>
                                </Box>
                                <Paper className={classes.particularOrder} variant="outlined">
                                      <Box display="flex" p={0} bgcolor="background.paper">
                                            <Box p={1} width="100%">
                                            {data.cab_service.cab_service_opted?"CAB service":""}
                                            </Box>
                                            <Box p={1}>
                                            {data.cab_service.cab_service_opted?"Rs. 2000":""}
                                            </Box>
                                      </Box>
                                      <Divider />
                                      <Box display="flex" p={0}>
                                            <Box p={1} width="100%">
                                            {data.cab_service.cab_service_opted?"Porter service":""}
                                            </Box>
                                            <Box p={1} flexShrink={1}>
                                            {data.cab_service.cab_service_opted?"Rs. 1000":""}
                                            </Box>
                                      </Box>
                                </Paper>
                        </Paper>*/}
                        <FormControlLabel
                        control={
                        <AquaBlueCheckBox
                        checked={true}
                        name="checkedF"
                        color="primary"
                        size="small"
                        />
                        }
                        label={<span style={{fontSize:"15px"}}>I agree to <span style={{color:"#00FFFF"}}> terms & conditions</span></span>}
                        />
                       <div> What's Next ? </div>
                      <Paper className={classes.Services}>
                          <List>
                              <ListItem>
                              <ListItemAvatar>
                                <Avatar  style={{backgroundColor:"#000066"}}>
                                  1
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
                              </ListItem>
                              <ListItem>
                              <ListItemAvatar>
                                <Avatar  style={{backgroundColor:"#000066"}}>
                                  2
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
                              </ListItem>
                              <ListItem>
                              <ListItemAvatar>
                                <Avatar  style={{backgroundColor:"#000066"}}>
                                  3
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
                              </ListItem>
                              <ListItem>
                              <ListItemAvatar>
                                <Avatar  style={{backgroundColor:"#000066"}}>
                                  4
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
                              </ListItem>
                          </List>
                      </Paper>
                      <br></br>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                        <Paper className={classes.promocode}>
                              <Box display="flex" p={1} bgcolor="background.paper">
                                  <Box p={1} width="100%">
                                     Have any promoCode?
                                  </Box>
                                  <Box p={0} flexShrink={0}>
                                      <Button size="small" variant="outlined" color="primary" href="#outlined-buttons">
                                        Apply
                                      </Button>
                                  </Box>
                                </Box>
                        </Paper>
                        <br></br>
                        <Paper className={classes.promocode}>
                              <Box display="flex" p={0} bgcolor="background.paper">
                                  <Box p={1} width="100%">
                                     Total Cost
                                  </Box>
                                  <Box p={1} flexShrink={0}>
                                     Rs. 2000
                                  </Box>
                              </Box>
                              <Box display="flex" p={0} bgcolor="background.paper">
                                  <Box p={1} width="100%">
                                     Discount
                                     <br />
                                     <p style={{color:"blue"}}>
                                       Apply Coupon ?
                                     </p>
                                  </Box>
                                  <Box p={1} flexShrink={0}>
                                    - Rs. 500
                                  </Box>
                              </Box>
                              <Divider variant="middle"/>
                                  <Box display="flex" p={0} bgcolor="background.paper">
                                      <Box p={1} width="100%">
                                        Final Cost
                                      </Box>
                                      <Box p={1} flexShrink={0}>
                                         Rs. 1500
                                      </Box>
                                  </Box>
                            {width>500 && (
                            <Button className={classes.mobileButton} size="large" variant="contained" onClick={order}>
                              Book Now
                            </Button>)}
                  </Paper>
           </Grid>
      </Grid>
</div>
{(width <500) && (
  <AppBar className={classes.buttonMobile} position="fixed" onClick={order}>
    <Button className={classes.buttonMobile}>
      Book Now
    </Button>
  </AppBar>
)}
</>}
    </>
}
export default FinalOrder;
