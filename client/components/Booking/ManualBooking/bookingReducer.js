import {ACTIONS} from './constants';

export const reducer = (state, action) => {
  
  switch (action.type) {

    case ACTIONS.STATE:
       return action.payload

    /* User id */
    case ACTIONS.USER:
       return {...state, user: action.payload }

     /* Total Amount*/
    case ACTIONS.TOTAL_AMOUNT:
      return {...state, total_amount: action.payload }

    /*Train Number */
    case ACTIONS.TRAIN_NO:
      return {...state, train_no : action.payload}







    /*Station name*/
    case ACTIONS.RESERVATION_UPTO.STATION_NAME:
      return {...state , booking_information : {...state.booking_information , reservation_upto : {...state.booking_information.reservation_upto, station_name : action.payload}}}
                                  
    case ACTIONS.RESERVATION_UPTO.DATE:
      return {...state , booking_information : {...state.booking_information , reservation_upto : {...state.booking_information.reservation_upto, date : action.payload}}}
      
    case ACTIONS.RESERVATION_UPTO.TIME:
      return {...state , booking_information : {...state.booking_information , reservation_upto : {...state.booking_information.reservation_upto, time : action.payload}}}
      
    case "BOARDING_STATION_NAME":
      return {...state , booking_information : {...state.booking_information , boarding_station : {...state.booking_information.boarding_station, station_name : action.payload}}}
                                  
    case "BOARDING_STATION_DATE":
      return {...state , booking_information : {...state.booking_information , boarding_station : {...state.booking_information.boarding_station, date : action.payload}}}
      
    case "BOARDING_STATION_TIME":
      return {...state , booking_information : {...state.booking_information , boarding_station : {...state.booking_information.boarding_station, time : action.payload}}}
      
    case "ADD_PASSENGER":
      return {...state, passenger_details : [...state.passenger_details, action.payload]}

    case "REMOVE_PASSENGER":
      state.passenger_details.splice(action.payload, 1);
      return {...state, passenger_details:[...state.passenger_details]}  




      

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
  case ACTIONS.PASSENGER_DETAIL.SEAT:
     const pass_detail_seat = state.passenger_details
      .map((value, idx) => {
      if(action.sidx != idx) return value;
      return {...value, seat_number: action.payload }})
      return {...state, passenger_details: pass_detail_seat}

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
        console.log(299, pass_detail_bill_meetgreet)
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
        console.log(322, pass_detail_bill_total)
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
         large_bags: {...state.porter_service_detail.large_bags,
           unit: parseInt(action.payload),
           total: parseFloat(process.env.NEXT_PUBLIC_LUGGAGE_20KG_TO_30KG_PRICE*action.payload)} }}
    case ACTIONS.PORTER_SERVICE.MEDIUM_BAG:
       return {...state, porter_service_detail: {
       ...state.porter_service_detail,
       medium_bags: {...state.porter_service_detail.medium_bags,
         unit: parseInt(action.payload),
         total: parseFloat(process.env.NEXT_PUBLIC_LUGGAGE_7KG_TO_20KG_PRICE*action.payload)} }}
    case ACTIONS.PORTER_SERVICE.SMALL_BAG:
       return {...state, porter_service_detail: {
       ...state.porter_service_detail,
       small_bags: {...state.porter_service_detail.small_bags,
         unit: parseInt(action.payload),
         total: parseFloat(process.env.NEXT_PUBLIC_LUGGAGE_BELOW_7KG_PRICE*action.payload)} }}

    case ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.OPTED:
        return {...state, porter_service_detail: {
        ...state.porter_service_detail,
        baggage_garanteed: {...state.porter_service_detail.baggage_garanteed,
          baggage_garanteed_opted: action.payload} }}


    case ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.LARGE_BAG:
       return {...state, porter_service_detail: {
         ...state.porter_service_detail,
         baggage_garanteed: {...state.porter_service_detail.baggage_garanteed,
           ...state.porter_service_detail.baggage_garanteed,
           large_bags:{
             unit: parseInt(action.payload),
             total: parseFloat(process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_20KG_TO_30KG_PRICE*action.payload) }} }}


    case ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.MEDIUM_BAG:
      return {...state, porter_service_detail: {
        ...state.porter_service_detail,
        baggage_garanteed: {...state.porter_service_detail.baggage_garanteed,
          ...state.porter_service_detail.baggage_garanteed,
          medium_bags:{
            unit: parseInt(action.payload),
            total: parseFloat(process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_7KG_TO_20KG_PRICE*action.payload)  }} }}


   case ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.SMALL_BAG:
       return {...state, porter_service_detail: {
         ...state.porter_service_detail,
         baggage_garanteed: {...state.porter_service_detail.baggage_garanteed,
           ...state.porter_service_detail.baggage_garanteed,
           small_bags:{
             unit: parseInt(action.payload),
             total: parseFloat(process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_BELOW_7KG_PRICE*action.payload)  }} }}



   case ACTIONS.PORTER_SERVICE.PORTER_BILL:
      // return {...state, porter_service_detail: {
      //   ...state.porter_service_detail,
      //     porter_bill: 1  } }


   // case ACTIONS.PORTER_SERVICE.PORTER_BILL_ZERO:
   //      return {...state, total_amount: parseFloat(state.total_amount) + parseFloat(action.payload) }


   // case ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.BG_BILL:
   //    return {...state, total_amount: parseFloat(state.total_amount) + parseFloat(action.payload) }
   //
   // case ACTIONS.PORTER_SERVICE.BAGGAGE_GARANTEED.BG_BILL_ZERO:
   //     return {...state, total_amount: parseFloat(state.total_amount) + parseFloat(action.payload) }

     default:
        return state
  }
}
