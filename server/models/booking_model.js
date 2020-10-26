const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const bookingSchema = mongoose.Schema({
    pnr_number: {
      type:String,
      //required: true
    },
    user_id: {
      type: ObjectId,
      ref:"User"
    },
    booking_information:{
      train_no: Number,
      train_name: String,
      is_arrival: Boolean,
      station: String,
      time: Date
    },
    passenger_contact_information:{
       primary_contact_number: String,
       secondary_contact_number: String,
       email_id: String
    },
    passenger_details: [{
      seat_number: String,
      passenger_name: String,
      age_group: { type: ObjectId, ref:"Age_Group" },
      gender: { type: ObjectId, ref:"Gender"},
      meet_and_greet: { type: Boolean, default: false },
      wheel_chair: { type: Boolean, default: false },
      golf_cart: { type: Boolean, default: false }
    }],
    car_service_opted: Boolean,
    car_service_detail:{
      destination: String,
      number_of_passengers: Number,
      luggage_bags: Number,
      number_of_cab: Number,
      price: Number
    },
    status: Boolean,
    del_flag: { type: Boolean, default: false },
}, { timestamp: true })

module.exports = mongoose.model("Booking", bookingSchema);
