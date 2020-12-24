import { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/core/styles";
import useWindowSize from '../../helpers/windowDimension';
import { getCookie, isAuth,removeLocalStorage } from "../../actions/auth";
import { Grid,Button,AppBar,FormControlLabel,Checkbox} from "@material-ui/core";
import { create_order, verify_order, modify_order, single_order_by_id } from '../../actions/order';
import useStyles from './style';
import Checkout from './checkout';
import Services from './services';
import Summary from './summary';
import TakenServices from './takenServices';
import Router from 'next/router';


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
const [originalOrder, setOriginalOrder] = useState();
const order_id = query && query.order_id;
const [termsChecked, setTermsChecked] = useState(false);

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
},[])


const order = (e) => {
 e.preventDefault()
  if(!order_id){
    return create_order(data)
       .then(response => {
         if(response.error){
           return console.log(response.error)
         }
         paymentHandler(response._id)
       })
       .catch((err) => {
         console.log(err)
       })
  }
  updateOrder()
}


const updateOrder = () => {
  let original = originalOrder && originalOrder.total_amount
  let difference = original - (data && data.total_amount)

  if(difference>0){
    return modify_order(data, original)
         .then(response => {
           if(response.error){
             return console.log(response.error)
           }
          console.log(response)
         })
         .catch((err) => {
           console.log(err)
         })
  }
  else if(difference<0){
    return  modify_order(data)
               .then(response => {
                 if(response.error){
                   return console.log(response.error)
                 }
                 paymentHandler(response._id, -difference)
               })
               .catch((err) => {
                 console.log(err)
               })
  }

    modify_order(data)
         .then(response => {
           if(response.error){
             return console.log(response.error)
           }
          console.log(response)
         })
         .catch((err) => {
           console.log(err)
         })
}

const paymentHandler = (orderId, amount) => {
    const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    amount: amount*100,
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
           Router.replace("/booking/my_bookings")
           return;
         }
          Router.replace("/booking/my_bookings")
         return;
       })
       .catch((err) => {
         console.log(err)
       })
    }
  }
    const razorpay = new window.Razorpay(options);
    razorpay.open()
}

const terms = () => {
   return <div className="pt-3 pb-3">
            <FormControlLabel
             control={<GreenCheckbox checked={termsChecked}  onChange={() => setTermsChecked(!termsChecked) } name="checkedG" />}
            />
             <span className="o-terms-condition"><span style={{ color:"black"}}>I agree to the </span> Terms and Conditions</span>
          </div>
}

return  <>
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
             <Checkout data={data} order={order} originalOrder={originalOrder} terms={termsChecked}/>
           </div>
        </div>
        {(width <500) && (
          <AppBar className={classes.buttonMobile} position="fixed" onClick={order} >
            <Button className={classes.buttonMobile} disabled={!termsChecked}>
              Book Now
            </Button>
          </AppBar>
        )}
    </div>
    </>
}
export default Payment;
