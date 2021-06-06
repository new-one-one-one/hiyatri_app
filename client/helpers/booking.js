import { isAuth } from '../actions/auth';



class Booking {

    constructor(){
        this.booking = {
          pnr_number:"",
          boarding_station:{
            date:"",
            time:"",
            station_name:"",
            station_code:""
          },
          reservation_upto:{
            station_code:"",
            station_name:"",
            date:"",
            time:""
          },
          passenger_details:[],
          train_number:"",
          train_name:"",
          travel_time:""
        };
    }

    addBooking(detail){
      let booking = this.booking;
      let data = detail && detail.pnr_details;
      if(data){
        booking.pnr_number = data.pnr_number;
        booking.boarding_station = {date: data.boarding_station.date,
                                    station_name:data.boarding_station.station_name,
                                    station_code: data.boarding_station.station_code,
                                    time: data.boarding_station.time};
        booking.reservation_upto = {date: data.reservation_upto.date,
                                    station_name:data.reservation_upto.station_name,
                                    station_code: data.reservation_upto.station_code,
                                    time: data.reservation_upto.time};
        const passInfo = data.pass_info.map((pass, i) => {
        const seat_regex = "/\[0-9]";
        const seat_num = "[0-9]"
        const{
          booking_status_details,
          current_status_details
        }   = pass
        var seat_result=null;
        if(current_status_details.match(seat_num)){
          seat_result =current_status_details
        }

        else if(booking_status_details.match(seat_regex)){
          seat_result=booking_status_details;
        }
       
        return {passenger_name: "",
                bill:{
                  meet_and_greet:0,
                  wheel_chair:0,
                  golf_cart:0,
                  total:0
                },
                selected:true,
                seat_number:seat_result,
                age_group:"",
                gender:"",
                meet_and_greet:true,
                wheel_chair:false,
                golf_cart:false }})
        booking.passenger_details.push(passInfo)
        booking.train_name = data.train_name;
        booking.train_number = data.train_number;
        booking.travel_time = data.travel_time;
        return;
      }
    }
    getBooking(){
    return this.booking;
    }
}

export default Booking;
