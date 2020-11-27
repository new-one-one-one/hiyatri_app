const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cabSchema = mongoose.Schema({
        user: {
            type:ObjectId,
            required:true
        },
        booking_id: {
            type:ObjectId,
        },
        pnr_number: {
            type:String,
            required:true
        },
        cab_service_detail: {
            cab_service_opted: {
              type:String,
              default:false
            },
            destination: {
              type:String
            },
            number_of_passengers: {
              type:Number,
              default:0
            },
            luggage_bags: {
              type:Number,
              default:0
            },
            number_of_cab: {
              type:Number,
              default:0
            },
            total_amount: {
              type: Number,
              default:0
            }
        },
        del_flag: {
           type:Boolean,
           default:false
         }
}, { timestamps:true })

module.exports = mongoose.model("Cab", cabSchema);
