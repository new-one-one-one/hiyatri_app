import BookingInformation from "./booking";
import PassengerInformation from "./contact";
import PassengerDetails from "./passenger";
import PorterService from "./porter";
import CabService from "./cab";
import React from 'react';
import { useReducer, useEffect, useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Switch from "@material-ui/core/Switch";
import {Button,TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Router from 'next/router';
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from 'react-toastify';
import { create_booking } from '../../../actions/booking';
import { getCookie, isAuth, setLocalStorage } from "../../../actions/auth";
import { singleUser } from "../../../actions/user";
import {useForm} from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@material-ui/core";
import {ACTIONS, MONTH} from './constants';
import { reducer } from "./bookingReducer";
import { Box } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { RadioGroup, Typography } from "@material-ui/core";
import {IconInformation} from './../../iconInformation';




const TrainBooking = ({query , pnr}) => {
  const initialData = {
    train_no:"",
    user: "",
    pnr_number: "",
    booking_information: {
      is_arrival: query.pid==="arrival",
      boarding_station: {
         date: "",
         time: "",
         station_name: "",
         station_code: ""
     },
     reservation_upto: {
         station_code: "",
         station_name: "",
         date:  "",
         time: ""
     }
    },
    passenger_contact_information: {
     name: "",
     primary_contact_number: isAuth() && isAuth().phone_number,
     secondary_contact_number: "",
     email_id: ""
   },
    passenger_details: [{
      age_group: "",
      bill: {
        meet_and_greet: 0,
        wheel_chair: 0,
        golf_cart: 0,
        total: 0},
      gender: "",
      golf_cart: false,
      meet_and_greet: true,
      passenger_name: "",
      seat_number: "",
      wheel_chair: false,
      selected:true
    }],
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
  selected:true,
   total_amount: null
  }
    const theme = useTheme();
    const token = getCookie('token');
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const {register, errors, handleSubmit,control} = useForm({defaultValues:initialData});


    const [state, dispatch] = useReducer(reducer, initialData)
    const [invalidTime, setIsValidTime] = useState(false);
    // piyush's changes
    const [status, changeStatus] = useState(query.pid)
    query.pid = status


const handleAddPassenger = () => {
  dispatch({type:"ADD_PASSENGER", payload :{
        age_group: "",
        bill: {
          meet_and_greet: 0,
          wheel_chair: 0,
          golf_cart: 0,
          total: 0},
        gender: "",
        golf_cart: false,
        selected:true,
        meet_and_greet: true,
        passenger_name: "",
        seat_number: "",
        wheel_chair: false,
        selected:true
      }}
  )
}
const handleRemove=(i)=> {
  dispatch({type:"REMOVE_PASSENGER", payload:i})
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
            return process.env.NEXT_PUBLIC_GOLF_CART_5_TO_12_PRICE
          }
    }


    if(service_name === "luggage_bags"){
          if(category === "BELOW_7KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_BELOW_7KG_PRICE
          }
          if(category === "7KG_TO_20KG"){
            return process.NEXT_PUBLIC_LUGGAGE_7KG_TO_20KG_PRICE
          }
          if(category === "20KG_TO_30KG"){
            return process.env.NEXT_PUBLIC_LUGGAGE_20KG_TO_30KG_PRICE
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



const changeDate = (dateVal)=>{
  const selectedDate = new Date(dateVal);
  var month = selectedDate.getMonth()+1
  var date = selectedDate.getDate()
  date = String(date).length==1?"0"+date:date
  month = String(month).length==1?"0"+month:String(month)
  const yo_date = date+"-"+month+"-"+selectedDate.getFullYear()

  if(status==="departure")
    dispatch({type:"BOARDING_STATION_DATE", payload:yo_date})
  else
    dispatch({type:ACTIONS.RESERVATION_UPTO.DATE, payload:yo_date})

}

const handleChange = (value1, value2) => e => {
  if(value1 ==="train_no"){
    dispatch({type:ACTIONS.TRAIN_NO, payload:e.target.value})
  }
  if(value1 ==="pnr"){
    dispatch({type:ACTIONS.PNR, payload:e.target.value})
  }
  if(value1 ==="station_name"){
    if(status==="departure")
      dispatch({type:"BOARDING_STATION_NAME", payload:e.target.value})
    else
      dispatch({type:ACTIONS.RESERVATION_UPTO.STATION_NAME, payload:e.target.value})
  }

  if(value1 === "time"){
    if(status==="departure")
      dispatch({type:"BOARDING_STATION_TIME", payload:e.target.value})
    else
      dispatch({type:ACTIONS.RESERVATION_UPTO.TIME, payload:e.target.value})
  }



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


  }
  if(value1 === "passenger_detail_gender"){
              dispatch({ type: ACTIONS.PASSENGER_DETAIL.GENDER,
                         payload: e.target.value,
                         sidx: value2 })
  }
  if(value1 === "passenger_detail_meet_and_greet"){

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


const compare_date_time = (thisState) =>{
  const details={
    hrs:parseInt(status==="departure"?thisState.booking_information.boarding_station.time.substring(0,2):thisState.booking_information.reservation_upto.time.substring(0,2)),
    mins:parseInt(status==="departure"?thisState.booking_information.boarding_station.time.substring(3):thisState.booking_information.reservation_upto.time.substring(3)),
    date:(status==="departure"?thisState.booking_information.boarding_station.date:thisState.booking_information.reservation_upto.date).split("-")
  }

  var month = MONTH[String(parseInt(details.date[1]))];
  var today = new Date().getTime();
  var onthatDay = new Date(details.date[0]+" "+month+" "+details.date[2]+" "+details.hrs+":"+details.mins).getTime()
  return (onthatDay-today)/3600000 >= process.env.NEXT_PUBLIC_CAN_BOOK_BEFORE ? true : false ;

 }

const changeBookingType = (e) =>{
  changeStatus(e.target.value);
  dispatch({type:ACTIONS.IS_ARRIVAL, payload:e.target.value==="arrival"})
}

const handleSubmission = async(e) => {
  dispatch({type:ACTIONS.IS_ARRIVAL, payload:status==="arrival"})
  setLocalStorage("Booking", state)
  var  isValid = await compare_date_time(state)
   if(isValid)
      Router.push(`/booking/order/`)
   else
    setIsValidTime(!isValid)
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

  let is_arrival = status==="arrival"?true:
                 status==="departure"?false:null;

  dispatch({ type: ACTIONS.IS_ARRIVAL,
               payload: is_arrival })
},[])

useEffect(() => {
   dispatch({ type:ACTIONS.TOTAL_AMOUNT, payload: passengerBill() + porterBill() + baggageBill()})
},[state.passenger_details, state.porter_service_detail, state.porter_service_detail.baggage_garanteed])


  return <>
        <ToastContainer />

         <div className="main-div">
            <form>
              <div className="container-div">
                  <div className="top-subheading">

                      <h1>MEET & GREET</h1>


                      <div className="pnr-heading">
                          <div>
                          <div className="booking-Information shadow">
                            <table>
                              <thead>
                                <tr>
                                  <th>Booking Type</th>
                                  <th>PNR Number</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                  <RadioGroup style={{paddingTop:"22px"}}  onChange={changeBookingType} value={status}>
                                      <Box display="flex">
                                        <Box width="60%">
                                        <Radio  value="arrival"  color="primary"></Radio> <span style={{"fontSize":"15px"}}> Arrival</span>
                                        </Box>
                                        <Box>
                                        <Radio  value="departure" color="primary"></Radio> <span style={{"fontSize":"15px"}}>Departure</span>
                                        </Box>
                                      </Box>
                                     </RadioGroup>

                                  </td>
                                  <td>

                                  <TextField
                                    id="input-fixed-height"
                                    variant="outlined"
                                    type="number"
                                    size="small"
                                    value={pnr}
                                    disabled={true}
                                    name="pnr"
                                    inputRef={register({pattern: /^\d+$/,required: true , minLength:10})}
                                    onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                                    error={errors.pnr?true:false}
                                    helperText={errors.pnr?"Invalid PNR":""}
                                    onChange={handleChange("pnr")}
                                    className="hp-input"
                                    placeholder="PNR No."
                                    fullWidth />

                                  </td>
                                </tr>
                                </tbody>
                            </table>
                          </div>


                          </div>
                      </div>
                  </div>
                  <div className="booking-tables">
                      <span className="sub-heading">Booking Information</span>
                      <BookingInformation
                        query={query}
                        register={register}
                        errors={errors}
                        handleChange={handleChange}
                        state={state}
                        pnr={pnr}
                        changeDate={changeDate}

                    />
                    <span className="sub-heading">Passenger's Contact Information</span>
                      <PassengerInformation
                      register={register}
                      errors={errors}
                      handleChange={handleChange}
                      data={state}
                      />

                      <span className="sub-heading">Passenger's Details</span>

                      <PassengerDetails
                        register={register}
                        errors={errors}
                        handleChange={handleChange}
                        data={state}
                        remove={handleRemove}
                        addPassenger={handleAddPassenger}
                        />


                      <br />

                        <span className="mr-2">Porter Service</span>
                        <IconInformation serviceName={"Porter Service"} cost={process.env.NEXT_PUBLIC_LUGGAGE_BELOW_7KG_PRICE+","+process.env.NEXT_PUBLIC_LUGGAGE_7KG_TO_20KG_PRICE+","+process.env.NEXT_PUBLIC_LUGGAGE_20KG_TO_30KG_PRICE}  type={"luggage"}></IconInformation>
                        <Switch
                        color="primary"
                        onChange={handleChange("porter_service_opted")}
                        checked={state.porter_service_detail.porter_service_opted} />
                      {(state.porter_service_detail.porter_service_opted)&&
                        <PorterService
                        state={state}
                        handleChange={handleChange} />
                      }
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
         <Dialog open={invalidTime} keepMounted>
            <DialogTitle><b>Invalid Time or Date</b></DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText>
                  Please check your {status} time  and {status} date <br></br>
                  It should be before {process.env.NEXT_PUBLIC_CAN_BOOK_BEFORE} hrs of
                  your mentioned date and time !
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>setIsValidTime(false)} id="yes-btn">Close</Button>
            </DialogActions>
          </Dialog>
      </>

};

export default TrainBooking;
