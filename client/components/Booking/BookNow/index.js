import BookingInformation from "./booking";
import PassengerInformation from "./contact";
import PassengerDetails from "./passenger";
import PorterService from "./porter";
import CabService from "./cab";
import { useReducer, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from 'next/router';
import HashLoader from "react-spinners/HashLoader";
import { create_booking } from '../../../actions/booking';
import { getCookie, isAuth, setLocalStorage } from "../../../actions/auth";
import { singleUser } from "../../../actions/user";
import {useForm} from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@material-ui/core";
import { getServiceAmount } from './services';
import { reducer } from './reducers';
import { ACTIONS } from './actions';
import { useToast } from "@chakra-ui/react"




const TrainBooking = ({ data, query, pnrWorked, modify, order }) => {
const theme = useTheme();
const token = getCookie('token');
const matches = useMediaQuery(theme.breakpoints.up("md"));
const {register,unregister, errors, handleSubmit} = useForm();
const toast = useToast()
const capitalize = (s) => {
if (typeof s !== 'string') return ''
return s.charAt(0).toUpperCase() + s.slice(1)
}


const initialData = {
  user: "",
  pnr_number: "",
  booking_information: {
    is_arrival: null,
    boarding_station: {
       date: data.boarding_station.date,
       time: data.boarding_station.time,
       station_name: data.boarding_station.station_name,
       station_code: data.boarding_station.station_code
   },
   reservation_upto: {
       station_code: data.reservation_upto.station_code,
       station_name: data.reservation_upto.station_name,
       date:  data.reservation_upto.date,
       time: data.reservation_upto.time
   }
  },
  passenger_contact_information: {
   name: "",
   primary_contact_number: isAuth() && isAuth().phone_number,
   secondary_contact_number: "",
   email_id: ""
 },
  passenger_details: data.passenger_details[0],
  cab_service_detail: {
    cab_service_opted: null,
    destination: null,
    number_of_passengers: null,
    luggage_bags: null,
    number_of_cab: null,
    total_amount: 0
},
  porter_service_detail: {
    porter_service_opted: true,
    large_bags:{
      unit:0,
      total: 0
    },
    medium_bags:{
      unit:0,
      total: 0
    },
    small_bags: {
      unit:0,
      total: 0
    },
    baggage_garanteed: {
      baggage_garanteed_opted: false,
      large_bags: {
        unit: 0,
        total: 0
      },
      medium_bags: {
        unit: 0,
        total: 0
      },
      small_bags: {
        unit: 0,
        total: 0
      }
    }
},
 total_amount: null
}

const [state, dispatch] = useReducer(reducer, initialData)
const handleChange = (value1, value2) => e => {
  /* Passenger contact information */
  if(value1 === "passenger_name"){
              dispatch({ type: ACTIONS.PASSENGER_CONTACT_INFO.NAME,
                        payload: e.target.value })
  }
  if(value1 === "passenger_primary_number"){
              dispatch({ type: ACTIONS.PASSENGER_CONTACT_INFO.PRIMARY,
                        payload: e.target.value })
  }
  if(value1 === "passenger_secondary_number"){
              dispatch({ type: ACTIONS.PASSENGER_CONTACT_INFO.SECONDARY,
                         payload: e.target.value })
  }
  if(value1 === "passenger_email"){
              dispatch({ type: ACTIONS.PASSENGER_CONTACT_INFO.EMAIL,
                         payload: e.target.value })
  }

  /* Passengers details */
  if(value1 === "select_passenger"){
      dispatch({ type: ACTIONS.PASSENGER_DETAIL.SELECT, sidx: value2, payload: e.target.checked })
      if(!e.target.checked){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.AGE,
                         payload: "",
                         sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                          payload: false,
                          sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                         payload: false,
                         sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR_ZERO,
                       sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART_ZERO,
                       sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
                       payload: - (state.passenger_details[value2].bill.meet_and_greet),
                       sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                       payload: - (state.passenger_details[value2].bill.total),
                       sidx: value2 })
      }
  }
  if(value1 === "passenger_detail_seat"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.SEAT,
                         payload: e.target.value,
                         sidx: value2 })
  }

  if(value1 === "passenger_detail_name"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.NAME,
                         payload: e.target.value,
                         sidx: value2 })
  }
  if(value1 === "passenger_detail_age"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.AGE,
                         payload: e.target.value,
                         sidx: value2 })

            if(e.target.value == ""){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
                        payload: - (state.passenger_details[value2].bill.meet_and_greet),
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                        payload: - (state.passenger_details[value2].bill.total),
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                        payload: false,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                        payload: false,
                        sidx: value2 })
              return;
            }

            if(state.passenger_details[value2].bill.meet_and_greet !=0 || state.passenger_details[value2].bill.total !=0){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
                        payload: - (state.passenger_details[value2].bill.meet_and_greet),
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                        payload: - (state.passenger_details[value2].bill.total),
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
                        payload: getServiceAmount("meet_and_greet", e.target.value),
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                        payload: getServiceAmount("meet_and_greet", e.target.value),
                        sidx: value2 })


              dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                        payload: false,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                        payload: false,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR_ZERO,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART_ZERO,
                        sidx: value2 })
              return;
            }

             dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
                       payload: getServiceAmount("meet_and_greet", e.target.value),
                       sidx: value2 })

             dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                       payload: getServiceAmount("meet_and_greet", e.target.value),
                       sidx: value2 })

             dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                       payload: false,
                       sidx: value2 })

             dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                       payload: false,
                       sidx: value2 })

             dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR_ZERO,
                       sidx: value2 })

             dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART_ZERO,
                       sidx: value2 })


              // dispatch({ type: ACTIONS.PASSENGER_DETAIL.MEETGREET,
              //           payload: false,
              //           sidx: value2 })
              //
              // dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
              //           payload: false,
              //           sidx: value2 })
              //
              // dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
              //           payload: false,
              //           sidx: value2 })
              //
              // dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET_ZERO,
              //           sidx: value2 })
              //
              // dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR_ZERO,
              //           sidx: value2 })
              //
              // dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART_ZERO,
              //           sidx: value2 })
              //
              // dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL_ZERO,
              //           sidx: value2 })


  }
  if(value1 === "passenger_detail_gender"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.GENDER,
                         payload: e.target.value,
                         sidx: value2 })
  }
  if(value1 === "passenger_detail_meet_and_greet"){
      //  if(!e.target.checked){
      //          // e.target.value is false
      //        dispatch({ type: ACTIONS.PASSENGER_DETAIL.MEETGREET,
      //                    payload: e.target.checked,
      //                    sidx: value2 })
      //
      //        dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
      //                  payload: - getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
      //                  sidx: value2 })
      //
      //
      //        if(state.passenger_details[value2].wheel_chair){
      //          dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR,
      //          payload: - getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
      //          sidx: value2 })
      //
      //          dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
      //                    payload: - getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
      //                    sidx: value2 })
      //        }
      //
      //        if(state.passenger_details[value2].golf_cart){
      //          dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART,
      //          payload: - getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
      //          sidx: value2 })
      //
      //          dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
      //                    payload: - getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
      //                    sidx: value2 })
      //        }
      //
      //        dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
      //                  payload: - getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
      //                  sidx: value2 })
      //
      //
      //       dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
      //                   payload: e.target.checked,
      //                   sidx: value2 })
      //
      //       dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
      //                  payload: e.target.checked,
      //                  sidx: value2 })
      //     return;
      // }
      // if(state.passenger_details[value2].age_group){
      //   dispatch({ type: ACTIONS.PASSENGER_DETAIL.MEETGREET,
      //              payload: e.target.checked,
      //              sidx: value2 })
      //
      //   dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
      //             payload: getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
      //             sidx: value2 })
      //
      //   dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
      //             payload: getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
      //             sidx: value2 })
      //   return;
      // }
      //   toast.error("Please select age group")
  }
  if(value1 === "passenger_detail_wheel_chair"){
        if(!state.passenger_details[value2].meet_and_greet){
          return;
        }
        if(!e.target.checked){
                    dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                           payload: e.target.checked,
                           sidx: value2 })

                    dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR,
                    payload: - getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
                    sidx: value2 })

                  dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                        payload: -getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
                        sidx: value2 })
            return;
        }

        if(state.passenger_details[value2].age_group){
          dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                 payload: e.target.checked,
                 sidx: value2 })

          dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR,
                payload: getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
                sidx: value2 })

          dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                payload: getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
                sidx: value2 })
          return;
        }
        // toast.error("")
        toast({
          title: "Please select age group",
          description: "",
          status: "error",
          position:"top",
          duration: 3000,
          isClosable: true,
        })
  }
  if(value1 === "passenger_detail_golf_cart"){
        if(!state.passenger_details[value2].meet_and_greet){
          return;
        }

        if(!e.target.checked){
                    dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                           payload: e.target.checked,
                           sidx: value2 })

                    dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART,
                    payload: - getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
                    sidx: value2 })

                  dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                        payload: - getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
                        sidx: value2 })
            return;
        }

       if(state.passenger_details[value2].age_group){
         dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                payload: e.target.checked,
                sidx: value2 })

         dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART,
              payload: getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
              sidx: value2 })

         dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
              payload: getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
              sidx: value2 })
          return;
       }
         console.log("Please select age group first")
  }




  /* CAB services */
  if(value1 === "cab_service_opted"){
           dispatch({ type: ACTIONS.CAB_SERVICE.OPTED,
                     payload: e.target.checked })
  }

  /* Porter Service */
  if(value1 === "porter_service_opted"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.OPTED,
                     payload: e.target.checked })

            if(!e.target.checked){
                 dispatch({ type:ACTIONS.TOTAL_AMOUNT, payload: passengerBill() })
            }
  }
  if(value1 === "porter_service_lg_bags"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.LARGE_BAG,
                     payload: !e.target.value?0:e.target.value })

           dispatch({ type: ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.LARGE_BAG,
                     payload: e.target.value })


  }
  if(value1 === "porter_service_md_bags"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.MEDIUM_BAG,
                     payload: !e.target.value?0:e.target.value })

           dispatch({ type: ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.MEDIUM_BAG,
                     payload: e.target.value })
  }
  if(value1 === "porter_service_sm_bags"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.SMALL_BAG,
                     payload: !e.target.value?0:e.target.value })


           dispatch({ type: ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.SMALL_BAG,
                     payload: e.target.value })
  }

  if(value1 === "baggage_garanteed_opted"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.OPTED,
                     payload: e.target.checked })

          if(e.target.checked){
            return dispatch({ type: ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.BG_BILL,
                      payload: baggageBill() })
          }

          if(!e.target.checked){
             return dispatch({ type: ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.BG_BILL_ZERO,
                       payload: -baggageBill() })
           }
  }
}
// console.log(state.porter_service_detail.porter_service_opted)
const bookingFromLS = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("Booking")) {
    return JSON.parse(localStorage.getItem("Booking"));
  } else {
    return false;
  }
};


const handleSubmission = e => {
    setLocalStorage("Booking", state)
    Router.push(`/booking/order/`)
}

const passengerBill = () => {
    let passenger_bill = state && state.passenger_details && state.passenger_details.map((passenger, i) => {
            return passenger.bill && passenger.bill.total
   })
    let total = passenger_bill && passenger_bill.reduce((a, b) => a + b)

       return total;
}
const porterBill = () => {
      if(!(state && state.porter_service_detail && state.porter_service_detail.porter_service_opted)){
        return 0;
      }
      let bill = [];
      bill.push(state.porter_service_detail.large_bags.total);
      bill.push(state.porter_service_detail.medium_bags.total);
      bill.push(state.porter_service_detail.small_bags.total);
      return bill.reduce((a,b) => a + b);
}
const baggageBill = () => {
  if(!(state && state.porter_service_detail && state.porter_service_detail.baggage_garanteed && state.porter_service_detail.baggage_garanteed.baggage_garanteed_opted)){
    return 0;
  }
  let bill = [];
      bill.push(state.porter_service_detail.baggage_garanteed.large_bags.total)
      bill.push(state.porter_service_detail.baggage_garanteed.medium_bags.total)
      bill.push(state.porter_service_detail.baggage_garanteed.small_bags.total)
      return bill.reduce((a,b) => a + b)
}

useEffect(() => {
  if(bookingFromLS()){
     return dispatch({ type: ACTIONS.STATE,
               payload: bookingFromLS() })
  }
   dispatch({ type: ACTIONS.USER,
             payload: isAuth() && isAuth()._id })

   dispatch({ type: ACTIONS.PNR,
              payload: query.pnr })

  let is_arrival = query.pid==="arrival"?true:
                 query.pid==="departure"?false:null;

  dispatch({ type: ACTIONS.IS_ARRIVAL,
               payload: is_arrival })
},[])



useEffect(() => {
   dispatch({ type:ACTIONS.TOTAL_AMOUNT, payload: passengerBill() + porterBill() + baggageBill()})
},[state.passenger_details, state.porter_service_detail, state.porter_service_detail.baggage_garanteed])




const showUavailabitlity = (reason, content ) =>{
  return (
      <Dialog open={true} keepMounted>
      <DialogTitle><b>{reason} </b></DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{Router.push("/")}} size="large" variant="contained" id="yes-btn">Close</Button>
      </DialogActions>
    </Dialog>
  )
}


const compare_date_time = (details) =>{
var arr = {
  "01":"Jan", "02":"Feb", "03":"Mar","04":"Apr","05":"May","06":"June","07":"July","08":"Aug","09":"Sep","10":"Oct","11":"Nov","12":"Dec"
};
 var month = arr[details.date[1]];
  var today = new Date().getTime();
  var onthatDay = new Date(details.date[2]+" "+month+" "+details.date[0]+" "+details.hrs+":"+details.mins).getTime();
  return (onthatDay-today)/3600000 >= process.env.NEXT_PUBLIC_CAN_BOOK_BEFORE ? true : false ;

}


var isValid = true;
var validDay=true;

// checking about station code
if(query.pid!=="arrival"){
  isValid = (data.boarding_station.station_code==="NDLS" || data.boarding_station.station_code==="DLI");
}
else {
  isValid = data.reservation_upto.station_code==="NDLS" || data.reservation_upto.station_code==="DLI" ;
}

if(isValid){
  const fixedDetails={
    hrs:parseInt(query.pid==="departure"?data.boarding_station.time.substring(0,2):data.boarding_station.time.substring(0,2)),
    mins:parseInt(query.pid==="departure"?data.reservation_upto.time.substring(3):data.reservation_upto.time.substring(3)),
    date:(query.pid==="departure"?data.boarding_station.date:data.reservation_upto.date).split("-")
  }
  validDay=compare_date_time(fixedDetails);
}


if(isValid && validDay){
  return <>
         <div className="main-div">
            <form>
              <div className="container-div">
                  <div className="top-subheading">
                      <h1>MEET & GREET</h1>
                      <div className="pnr-heading">
                          <div>
                              <span>
                                {capitalize(query.pid)} - PNR No. - {data.pnr_number}
                              </span>
                          </div>
                          <span>
                             No. of Passengers - {data.passenger_details[0] && data.passenger_details[0].length}
                          </span>
                      </div>
                  </div>
                  <div className="booking-tables">
                      <span className="sub-heading">Booking Information</span>
                      <BookingInformation
                      query={query}
                      data={data} />

                      <span className="sub-heading">Passenger's Contact Information</span>
                      <PassengerInformation
                      register={register}
                      errors={errors}
                      handleChange={handleChange}
                      data={state} />

                      <span className="sub-heading">Passenger's Details</span>
                      <PassengerDetails
                        register={register}
                        errors={errors}
                        handleChange={handleChange}
                        data={state}  />

                      {/*<span className="sub-heading">Cab service (Only Available in Delhi NCR)</span>
                      <Switch
                      onChange={handleChange("cab_service_opted")}
                      value={state.cab_service_detail.cab_copted} />
                      <CabService />*/}

                      <span>Porter Service</span>
                      <Switch
                      color="primary"
                      onChange={handleChange("porter_service_opted")}
                      checked={state.porter_service_detail.porter_service_opted} />
                      {state.porter_service_detail.porter_service_opted && <PorterService
                      state={state}
                      handleChange={handleChange} />}
                      <br />
                      {matches ? (
                      <div className="payable-amt-section">
                      <>
                        <div>
                           <span>Payable amount:</span>
                           <br />
                           <b>₹{state.total_amount}</b>
                        </div>
                        <Button
                        className="md-btn"
                        onClick={handleSubmit(handleSubmission)}
                        variant="outlined"
                        type="submit"
                        >
                         Continue
                        </Button>
                      </>
                      </div>
                      ) : (
                        <Button
                            onClick={handleSubmit(handleSubmission)}
                            variant="outlined"
                            className="md-btn"

                            type="submit">
                            {`REVIEW YOUR BOOKING & Pay ₹${state.total_amount}`}
                        </Button>
                      )}
                  </div>
              </div>
            </form>
         </div>
      </>
}
else if(!validDay){
  return <>
        {showUavailabitlity(`Issues with booking time`, `Your PNR is of previous date which has passed or you have requested our service within ${process.env.NEXT_PUBLIC_CAN_BOOK_BEFORE} hrs.  Click on below button, you will be redirected to the homepage shortly.`)}
        </>
}
else{
  return <>
         {showUavailabitlity("Service Unavailable", "Thank you for joining with us! But we are only supporting Old Delhi railway Station and New Delhi Station.Click on below button, you will be redirected to the homepage shortly.")}
        </>
}



};

export default TrainBooking;
