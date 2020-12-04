import BookingInformation from "./bookingInformation";
import PassengerInformation from "./passengerContact";
import PassengerDetails from "./passengerDetails";
import PorterService from "./porter";
import CabService from "./cab";
import { useReducer, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from 'next/router';
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from 'react-toastify';
import { create_booking } from '../../../actions/booking';
import { getCookie, isAuth, setLocalStorage } from "../../../actions/auth";
import { singleUser } from "../../../actions/user";
import {useForm} from 'react-hook-form';


const TrainBooking = ({ data, query, modify, order }) => {
const theme = useTheme();
const token = getCookie('token');
const matches = useMediaQuery(theme.breakpoints.up("md"));
const {register, errors, handleSubmit} = useForm();
const capitalize = (s) => {
if (typeof s !== 'string') return ''
return s.charAt(0).toUpperCase() + s.slice(1)
}



const getServiceAmount = (service_name, category) => {
    if(service_name === "meet_and_greet"){
          if(category === "Sr citizen(above 60)"){
            return process.env.NEXT_PUBLIC_MEET_GREET_ABOVE_58_PRICE
          }
          if(category === "Adult(12yrs-60yrs)"){
            return process.env.NEXT_PUBLIC_MEET_GREET_12_TO_58_PRICE
          }
          if(category === "Children(upto 12 years)"){
            return process.env.NEXT_PUBLIC_MEET_GREET_5_TO_12_PRICE
          }
    }
    if(service_name === "wheel_chair"){
         return process.env.NEXT_PUBLIC_WHEEL_CHAIR_PRICE;
    }
    if(service_name === "golf_cart"){
          if(category === "Sr citizen(above 60)"){
            return process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_58_PRICE
          }
          if(category === "Adult(12yrs-60yrs)"){
            return process.env.NEXT_PUBLIC_GOLF_CART_12_TO_58_PRICE
          }
          if(category === "Children(upto 12 years)"){
            return process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_5_TO_12_PRICE
          }
    }
    if(service_name === "luggage_bags"){
          if(category === "BELOW_7KG"){
            return process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_58_PRICE
          }
          if(category === "7KG_TO_20KG"){
            return process.env.NEXT_PUBLIC_GOLF_CART_12_TO_58_PRICE
          }
          if(category === "20KG_TO_30KG"){
            return process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_5_TO_12_PRICE
          }
    }

    if(service_name === "luggage_gaurantee"){
          if(category === "BELOW_7KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_BELOW_7KG_PRICE
          }
          if(category === "7KG_TO_20KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_7KG_TO_20KG_PRICE
          }
          if(category === "20KG_TO_30KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_20KG_TO_30KG_PRICE
          }
    }
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
    porter_service_opted: null,
    number_of_large_bags: null,
    number_of_medium_bags: null,
    number_of_small_bags: null,
    total_amount: 0
},
 total_amount: null
}


const ACTIONS = {
  STATE:"state",
  USER:"user_id",
  PNR:"pnr",
  IS_ARRIVAL:"is_arrival",
  PASSENGER_CONTACT_INFO:{
    NAME:"name",
    PRIMARY:"primary_number",
    SECONDARY:"secondary_number",
    EMAIL:"email"
  },
  PASSENGER_DETAIL:{
    NAME:"passenger_detail_name",
    AGE:"passenger_detail_age",
    GENDER:"passenger_detail_gender",
    MEETGREET:"passenger_detail_meet_and_greet",
    WHEELCHAIR:"passenger_detail_wheel_chair",
    GOLFCART:"passenger_detail_golf_cart",
    BILL:{
      MEETGREET:"mg_price",
      WHEELCHAIR:"wl_price",
      GOLFCART:"gc_price",
      TOTAL:"passenger_total_bill",
      TOTAL_ZERO:"total_zero",
      MEETGREET_ZERO:"meet_and_greet_zero",
      GOLFCART_ZERO:"golf_cart_zero",
      WHEELCHAIR_ZERO:"wheel_chair_zero",
    }
  },
  CAB_SERVICE:{
    OPTED:"cab_copted",
    DESTINATION:"cab_destination",
    NUMBER_OF_PASS:"cab_number_of_pass",
    LAGGAGE_BAG:"cab_laggage_bag",
    NUMBER_OF_CAB:"cab_number_of_cab",
    TOTAL_AMOUNT:"cab_price"
  },
  PORTER_SERVICE:{
    OPTED:"porter_copted",
    LARGE_BAG:"porter_large_bags",
    MEDIUM_BAG:"porter_medium_bags",
    SMALL_BAG:"porter_small_bags",
    TOTAL_AMOUNT:"porter_price"
  },
  TOTAL_AMOUNT: "total_amount"
}

const reducer = (state, action) => {
  switch (action.type) {

    case ACTIONS.STATE:
       return action.payload

    /* User id */
    case ACTIONS.USER:
       return {...state, user: action.payload }

     /* Total Amount*/
    case ACTIONS.TOTAL_AMOUNT:
      return {...state, total_amount: action.payload }

   /* PNR */
    case ACTIONS.PNR:
      return {...state, pnr_number: action.payload }

  /* Is arrival */
    case ACTIONS.IS_ARRIVAL:
      return {...state, booking_information: {
        ...state.booking_information,
        is_arrival: action.payload  }}

    /* Passenger contact information */
    case ACTIONS.PASSENGER_CONTACT_INFO.PRIMARY:
       return {...state, passenger_contact_information: {
         ...state.passenger_contact_information,
         primary_contact_number: action.payload }}
    case ACTIONS.PASSENGER_CONTACT_INFO.NAME:
      return {...state, passenger_contact_information: {
        ...state.passenger_contact_information,
        name: action.payload }}
    case ACTIONS.PASSENGER_CONTACT_INFO.SECONDARY:
      return {...state, passenger_contact_information: {
        ...state.passenger_contact_information,
        secondary_contact_number: action.payload }}
    case ACTIONS.PASSENGER_CONTACT_INFO.EMAIL:
      return {...state, passenger_contact_information: {
        ...state.passenger_contact_information,
        email_id: action.payload }}

  /* Passenger details */
    case ACTIONS.PASSENGER_DETAIL.NAME:
       const pass_detail_name = state.passenger_details
        .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, passenger_name: action.payload }})
        return {...state, passenger_details: pass_detail_name}

    case ACTIONS.PASSENGER_DETAIL.AGE:
       const pass_detail_age = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, age_group: action.payload }})
        return {...state, passenger_details: pass_detail_age}

    case ACTIONS.PASSENGER_DETAIL.GENDER:
       const pass_detail_gender = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, gender: action.payload }})
        return {...state, passenger_details: pass_detail_gender}

    case ACTIONS.PASSENGER_DETAIL.MEETGREET:
       const pass_detail_meetgreet = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, meet_and_greet: action.payload }})
        return {...state, passenger_details: pass_detail_meetgreet}

    case ACTIONS.PASSENGER_DETAIL.WHEELCHAIR:
       const pass_detail_wheelchair = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, wheel_chair: action.payload }})
        return {...state, passenger_details: pass_detail_wheelchair}

    case ACTIONS.PASSENGER_DETAIL.GOLFCART:
       const pass_detail_golfcart = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, golf_cart: action.payload }})
        return {...state, passenger_details: pass_detail_golfcart}

    case ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET:
       const pass_detail_bill_meetgreet = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, bill: {...value.bill, meet_and_greet: parseFloat(value.bill.meet_and_greet) + parseFloat(action.payload) } }})
        return {...state, passenger_details: pass_detail_bill_meetgreet }


    case ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR:
       const pass_detail_bill_wheelchair = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, bill: {...value.bill, wheel_chair: parseFloat(value.bill.wheel_chair) + parseFloat(action.payload) } }})
        return {...state, passenger_details: pass_detail_bill_wheelchair }

    case ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART:
       const pass_detail_bill_golfcart = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, bill: {...value.bill, golf_cart: parseFloat(value.bill.golf_cart) + parseFloat(action.payload) } }})
        return {...state, passenger_details: pass_detail_bill_golfcart }

    case ACTIONS.PASSENGER_DETAIL.BILL.TOTAL:
      const pass_detail_bill_total = state.passenger_details
      .map((value, idx) => {
       if(action.sidx != idx) return value;
       return {...value, bill: {...value.bill, total: parseFloat(value.bill.total) + parseFloat(action.payload) } }})
       return {...state, passenger_details: pass_detail_bill_total}


   case ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET_ZERO:
      const pass_detail_bill_meetgreet_zero = state.passenger_details
      .map((value, idx) => {
       if(action.sidx != idx) return value;
       return {...value, bill: {...value.bill, meet_and_greet: 0} }})
       return {...state, passenger_details: pass_detail_bill_meetgreet_zero }

     case ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART_ZERO:
        const pass_detail_bill_golfcart_zero = state.passenger_details
        .map((value, idx) => {
         if(action.sidx != idx) return value;
         return {...value, bill: {...value.bill, golf_cart: 0 } }})
         return {...state, passenger_details: pass_detail_bill_golfcart_zero }


     case ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR_ZERO:
        const pass_detail_bill_wheel_chair_zero = state.passenger_details
        .map((value, idx) => {
         if(action.sidx != idx) return value;
         return {...value, bill: {...value.bill, wheel_chair: 0 } }})
         return {...state, passenger_details: pass_detail_bill_wheel_chair_zero }


     case ACTIONS.PASSENGER_DETAIL.BILL.TOTAL_ZERO:
       const pass_detail_bill_total_zero = state.passenger_details
       .map((value, idx) => {
        if(action.sidx != idx) return value;
        return {...value, bill: {...value.bill, total: 0 } }})
        return {...state, passenger_details: pass_detail_bill_total_zero}


  /* CAB services  */
    case ACTIONS.CAB_SERVICE.OPTED:
       return {...state, cab_service_detail: {
         ...state.cab_service_detail,
         cab_service_opted: action.payload }}

  /* Porter services */
    case ACTIONS.PORTER_SERVICE.OPTED:
       return {...state, porter_service_detail: {
         ...state.porter_service_detail,
         porter_service_opted: action.payload }}
    case ACTIONS.PORTER_SERVICE.LARGE_BAG:
       return {...state, porter_service_detail: {
         ...state.porter_service_detail,
         number_of_large_bags: action.payload }}
    case ACTIONS.PORTER_SERVICE.MEDIUM_BAG:
       return {...state, porter_service_detail: {
       ...state.porter_service_detail,
       number_of_medium_bags: action.payload }}
    case ACTIONS.PORTER_SERVICE.SMALL_BAG:
       return {...state, porter_service_detail: {
       ...state.porter_service_detail,
       number_of_small_bags: action.payload }}
     default:
        return state
  }
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
  if(value1 === "passenger_detail_name"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.NAME,
                         payload: e.target.value,
                         sidx: value2 })
  }
  if(value1 === "passenger_detail_age"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.AGE,
                         payload: e.target.value,
                         sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.MEETGREET,
                        payload: false,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                        payload: false,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                        payload: false,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET_ZERO,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR_ZERO,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART_ZERO,
                        sidx: value2 })

              dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL_ZERO,
                        sidx: value2 })




  }
  if(value1 === "passenger_detail_gender"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.GENDER,
                         payload: e.target.value,
                         sidx: value2 })
  }
  if(value1 === "passenger_detail_meet_and_greet"){
       if(!e.target.checked){
               // e.target.value is false
             dispatch({ type: ACTIONS.PASSENGER_DETAIL.MEETGREET,
                         payload: e.target.checked,
                         sidx: value2 })

             dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
                       payload: - getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
                       sidx: value2 })

// console.log(state.passenger_details[value2].golf_cart, state.passenger_details[value2].wheel_chair)

             if(state.passenger_details[value2].wheel_chair){
               dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.WHEELCHAIR,
               payload: - getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
               sidx: value2 })

               dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                         payload: - getServiceAmount("wheel_chair", state.passenger_details[value2].age_group),
                         sidx: value2 })
             }

             if(state.passenger_details[value2].golf_cart){
               dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.GOLFCART,
               payload: - getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
               sidx: value2 })

               dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                         payload: - getServiceAmount("golf_cart", state.passenger_details[value2].age_group),
                         sidx: value2 })
             }



             dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                       payload: - getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
                       sidx: value2 })


            dispatch({ type: ACTIONS.PASSENGER_DETAIL.WHEELCHAIR,
                        payload: e.target.checked,
                        sidx: value2 })

            dispatch({ type: ACTIONS.PASSENGER_DETAIL.GOLFCART,
                       payload: e.target.checked,
                       sidx: value2 })
          return;
      }
      if(state.passenger_details[value2].age_group){
        dispatch({ type: ACTIONS.PASSENGER_DETAIL.MEETGREET,
                   payload: e.target.checked,
                   sidx: value2 })

        dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.MEETGREET,
                  payload: getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
                  sidx: value2 })

        dispatch({ type: ACTIONS.PASSENGER_DETAIL.BILL.TOTAL,
                  payload: getServiceAmount("meet_and_greet", state.passenger_details[value2].age_group),
                  sidx: value2 })
        return;
      }
        toast.error("Please select age group")
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
        toast.error("Please select age group")
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
  }
  if(value1 === "porter_service_lg_bags"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.LARGE_BAG,
                     payload: e.target.value })
  }
  if(value1 === "porter_service_md_bags"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.MEDIUM_BAG,
                     payload: e.target.value })
  }
  if(value1 === "porter_service_sm_bags"){
           dispatch({ type: ACTIONS.PORTER_SERVICE.SMALL_BAG,
                     payload: e.target.value })
  }
}



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
   if(modify){
     return Router.push(`/booking/modify/order/${query.order_id}`)
   }
   Router.push(`/booking/order/`)
}


const totalBill = () => {
    let passenger_bill = state && state.passenger_details.map((passenger, i) => {
            return passenger.bill && passenger.bill.total
   })
    let total = passenger_bill.reduce((a, b) => a + b)

       return total;
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
  if(modify && order){
     dispatch({ type: ACTIONS.STATE,
              payload: order })

      dispatch({ type: ACTIONS.USER,
                payload: isAuth() && isAuth()._id })

      dispatch({ type: ACTIONS.PNR,
                 payload: query.pnr })

     let is_arrival = query.pid==="arrival"?true:
                    query.pid==="departure"?false:null;

     dispatch({ type: ACTIONS.IS_ARRIVAL,
                  payload: is_arrival })
  }

},[order])

useEffect(() => {
   dispatch({ type:ACTIONS.TOTAL_AMOUNT, payload: totalBill() })
},[state.passenger_details])





return <>
        <ToastContainer />
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
                      disabled={true}
                      onChange={handleChange("porter_service_opted")}
                      value={state.porter_service_detail.porter_service_opted}
                       />
                      {state.porter_service_detail.porter_service_opted && <PorterService
                      handleChange={handleChange} />}
                      {matches ? (
                      <div className="payable-amt-section">
                      <>
                        <div>
                           <span>Payable amount:</span>
                           <br />
                           <b>₹{totalBill()}</b>
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
                            {`REVIEW YOUR BOOKING & Pay ₹${totalBill()}`}
                        </Button>
                      )}
                  </div>
              </div>
            </form>
         </div>
      </>
  };

export default TrainBooking;
