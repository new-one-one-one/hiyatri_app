const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const bookingSchema = mongoose.Schema({
        user_id:{
          type: ObjectId,
          required: true
        },
        pnr_number:{
          type: String,
          unique: true,
          required: true
        },
        booking_information:{
          is_arrival:{
            type: Boolean,
            required: true
          },
          boarding_station:{
            date:String,
            time:String,
            station_name:String,
            station_code:String,
          },
          reservation_upto:{
            station_code:String,
            station_name:String,
            date:String,
            time:String,
          }
        },

        passenger_contact_information:{
           primary_contact_number:String,
           secondary_contact_number:String,
           email_id:String,
        },
        passenger_details:[{
          seat_number: String,
          passenger_name: String,
          // age_group: { type: ObjectId, ref:"Age_Group" },
          // gender: { type: ObjectId, ref:"Gender"},
          age_group:{type: String},  //temporary
          gender:{type: String},  //temporary
          meet_and_greet: { type: Boolean, default: false },
          wheel_chair: { type: Boolean, default: false },
          golf_cart: { type: Boolean, default: false }
        }],
        car_service:{
          type: ObjectId,
          required: true
        },
        porter_service:{
          type: ObjectId,
          required: true
        },
<<<<<<< HEAD
        amount:{
          type: Number
        },
        booking_status:{
          type: ObjectId,
          ref: "Booking_Status"
        },
=======
        status:false,
>>>>>>> main
        del_flag: { type: Boolean, default: false }
}, { timestamp: true })

module.exports = mongoose.model("Booking", bookingSchema);
