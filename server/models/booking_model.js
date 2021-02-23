const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const bookingSchema = mongoose.Schema({
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
           name:String,
           primary_contact_number:String,
           secondary_contact_number:String,
           email_id:String,
        },
        passenger_details:[{
          _id:String,
          seat_number:String,
          bill:{
            golf_cart:Number,
            meet_and_greet:Number,
            wheel_chair: Number,
            total:Number
          },
          passenger_name:String,
          age_group:{ type: String, enum:['Sr citizen(above 58 years)','Adult(12-58 years)','Children(upto 12 years)']},
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
        booking_id:{
          type:String,
        },
        coupon:{
         type: String,
         default:null
        },
        total_amount:{
          type:Number,
          default:0
        },
        del_flag:{
          type:Boolean,
          default:false
        }
}, { timestamps:true })

module.exports = mongoose.model("Booking", bookingSchema);
