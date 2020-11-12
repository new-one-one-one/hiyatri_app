const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const bookingSchema = mongoose.Schema({
        booking_id:{
          type:String,
        },
        user:{
          type:ObjectId,
          required:true
        },
        pnr_number:{
          type:String,
          required:true
        },
        booking_information:{
          is_arrival:{
            type:Boolean,
            required:true
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
          _id:String,
          seat_number:String,
          passenger_name:String,
          age_group:String,
          gender:{ type: String, enum:['Male','Female']},
          meet_and_greet:{ type:Boolean, default:false },
          wheel_chair:{ type:Boolean, default:false },
          golf_cart:{ type:Boolean, default:false }
        }],
        cab_service:{
          type:ObjectId,
          ref:"Cab",
          required:true
        },
        porter_service:{
          type:ObjectId,
          ref:"Porter",
          required:true
        },
        total_amount:{
          type:Number
        },
        booking_status:{
          type:String,
          enum:['']
        },
        del_flag:{
          type:Boolean,
          default:false
        }
}, { timestamp:true })

module.exports = mongoose.model("Booking", bookingSchema);
