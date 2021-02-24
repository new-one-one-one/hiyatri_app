import { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/core/styles";
import useWindowSize from '../../helpers/windowDimension';
import { getCookie, isAuth,removeLocalStorage } from "../../actions/auth";
import { Grid,Icon,Dialog, DialogContent,Button,AppBar,FormControlLabel,Checkbox, Modal, Fade,Box} from "@material-ui/core";
import { create_order, verify_order, modify_order, single_order_by_id } from '../../actions/order';
import useStyles from './style';
import Checkout from './checkout';
import Services from './services';
import Summary from './summary';
import TakenServices from './takenServices';
import Router from 'next/router';
import Loader from 'react-loader-spinner'
import { Backdrop } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import {useForm} from 'react-hook-form';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {coupounData} from './coupons';

import CancelIcon from '@material-ui/icons/Cancel';
const GreenCheckbox = withStyles({
  root: {
    color: "#00c4ff",
    '&$checked': {
      color: "#00c4ff",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);



const Payment = ({ data, query }) => {

const token = getCookie('token');
const { width } = useWindowSize();
const classes = useStyles();
const {register,handleSubmit} = useForm();
const [originalOrder, setOriginalOrder] = useState();
const order_id = query && query.order_id;
const [termsChecked, setTermsChecked] = useState(false);
const [loader, setLoader] = useState(false);
const [successBooking, setBookingSuccess] = useState(false);
const [failedBooking, setBookingFailed]  = useState(false);
const [agreed, isAgreed] = useState(true);
const [couponCode, setCouponCode] = useState("");
const [invalidCoupun, setValidCoupoun] = useState(false);
const [flag, setFlag] = useState(0);
 useEffect(() => {
  if(order_id){
    single_order_by_id(order_id)
      .then(response => {
        if(response.error){
          return console.log(response.error)
        }
        setOriginalOrder(response.response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
},[])
  
const paymentHandler = async (orderId, amount) => {
  setLoader(true)
  let booking = data;
      booking.coupon = ((couponCode!=="")&& flag && !invalidCoupun)?couponCode:"Not Applied"
try {
  let new_order = await create_order(booking);
  setLoader(false)
  const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
  amount: amount*100,
  currency: 'INR',
  name: 'Payments',
  order_id: new_order._id,
  prefill: {
    contact: isAuth() && isAuth().phone_number,
    email: data && data.passenger_contact_information.email_id
  },
  theme: {
  color: '#2a306c',
  },
  handler(response) {
   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
    verify_order({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
     .then(result => {
       if(result.error){
        setBookingFailed(true)
        return console.log(result.error)
       }
       if(result.status === "ok"){
       setBookingSuccess(true)
       return;
       }
       setBookingFailed(true)
     })
     .catch((err) => {
       console.log(err)
       setBookingFailed(true)
     })
  }
}
  const razorpay = new window.Razorpay(options);
  removeLocalStorage("Booking")
  razorpay.open()
} catch (e) {
  console.log(e)
 }
}

const checkCouponCode= (appliedCode)=>{
  if(appliedCode==null || appliedCode==undefined || appliedCode=="")
    return true
  for(var i=0; i<coupounData.length;i++){
    if(coupounData[i].code == appliedCode)
      return true
  }
  return false
}

const submitCoupon=(code)=>{
  setFlag(1);
  if(!checkCouponCode(code)){
    setValidCoupoun(true)
  }
  else{
    setValidCoupoun(false)
  }
}

const handleCouponChange = (e) => {
   setValidCoupoun(false)
   setCouponCode(e.target.value)
}

const terms = () => {
   return <div className="pt-3 pb-3">
            <FormControlLabel
             control={<GreenCheckbox checked={termsChecked}  onChange={() => setTermsChecked(!termsChecked) } name="checkedG" />}
            />
             <span className="o-terms-condition"><span style={{ color:"black"}}>I agree to the </span> Terms and Conditions</span>
             <br></br>
             { (!(termsChecked ) && !agreed) && <em style={{color:"red"}}>please agree to our terms and conditions by clicking checkbox</em>}
          </div>
}

return  <>
      <div className="hp-loader">
      <Loader
          type="Oval"
          color="#00bcd4"
          height={150}
          width={150}
          visible={loader}
       />
      </div>
      <div className="mt-4">
        <h2 className="order-title">
         ORDER DETAIL
        </h2>
        <div className="pl-5 pr-5">
        <hr />
        </div>
         <div className="row justify-content-center">
           <div className="col-md-8">
             <Summary data={data} />
             <br></br>
             <TakenServices data={data}/>
             {terms()}
             <Services />
           </div>

           <div className="col-md-3">
             <Checkout data={data} register={register} order={paymentHandler} handleChange={handleCouponChange} originalOrder={originalOrder} terms={termsChecked} isAgreed={isAgreed} code={couponCode} invalidCoupun={invalidCoupun} submitCoupon={submitCoupon}/>
           </div>
        </div>
        {(width <500) && (
          <AppBar className={classes.buttonMobile} position="fixed" onClick={()=>{termsChecked ? paymentHandler() : isAgreed(false)}} >
            <Button className={classes.buttonMobile}>
              Book Now
            </Button>
          </AppBar>
        )}

    </div>
    <Dialog open={successBooking} aria-labelledby="customized-dialog-title">
            <Box style={{position:"absolute", top:"4px", right:"4px"}} >
                      <IconButton size="small" aria-label="close"  onClick={ () =>  Router.push('/')}>
                        <CloseIcon style={{width:"16px", height:"16px"}}  />
                        </IconButton>
                </Box>
          <DialogContent>

          <Box  p={3}>

            <div className="text-center">
            <font className="cm-title"><h4><b>
                <Icon style={{color:"green"}}>
                <CheckCircleOutlinedIcon></CheckCircleOutlinedIcon>

        </Icon> Congratulations! Booking successful</b></h4></font><small>
          <h6 className="on-cancellation"> Thank you! for using our services.</h6></small>
                <Box display="flex" p={2}>
                 <Box width="40%" p={1}>
                 </Box>
                 <Box p={1}>
                  <Button variant="contained" id="yes-btn"  onClick={()=>{Router.push('/')}}>CLOSE</Button>
                 </Box>     
                </Box>
                  
            </div>
          </Box>
          </DialogContent>
        </Dialog>


       
        <Dialog open={failedBooking}  onClose={()=>setBookingFailed(false)} aria-labelledby="customized-dialog-title" aria-labelledby="customized-dialog-title">
        <Box style={{position:"absolute", top:"4px", right:"4px"}} >
                      <IconButton size="small" aria-label="close"  onClick={ () => setOpen(false)}>
                        <CloseIcon style={{width:"16px", height:"16px"}}  />
                        </IconButton>
                </Box>
          <DialogContent>
          <div className={classes.paper}>
            <div className="text-center">
            <font className="cm-title"><h4><b>
            <Icon style={{color:"red"}}>
           <CancelIcon></CancelIcon>

        </Icon> Sorry! Booking Failed</b></h4></font><small>
          <h6 className="on-cancellation">There might be some technichal issue <br></br> Please try again !</h6></small>
                <Box display="flex" p={2}>
                 <Box width="40%" p={1}>
                 </Box>
                 <Box p={1}>
                  <Button variant="contained" id="yes-btn"  onClick={()=>{setBookingSuccess(false); Router.push('/')}}>CLOSE</Button>
                 </Box>     
                </Box>
                  
            </div>
          </div>
          </DialogContent>
        </Dialog>
    </>
}
export default Payment;
