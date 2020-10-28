class Booking {
    constructor(){
        this.booking = {
          user_id:"",
          pnr_number:"",
          booking_information:{
            is_arrival:"",
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
            }
          },
          passenger_contact_information:{
             primary_contact_number:"",
             secondary_contact_number:"",
             email_id:""
          },
          passenger_details:[],
          car_service_detail:{
             car_service_opted:false,
             destination:"",
             number_of_passengers:null,
             luggage_bags:null,
             number_of_cab:null,
             price:null
          },
          porter_service_detail:{
             porter_service_opted:false,
             number_of_large_bags:null,
             number_of_medium_bags:null,
             number_of_small_bags:null,
             price:null
          }
        };
    }

    // seat_number: String,
    // passenger_name: String,
    // age_group: { type: ObjectId, ref:"Age_Group" },
    // gender: { type: ObjectId, ref:"Gender"},
    // meet_and_greet: { type: Boolean, default: false },
    // wheel_chair: { type: Boolean, default: false },
    // golf_cart: { type: Boolean, default: false }

    AddBooking(data){

    }
}

export default Booking;
