const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const carServiceSchema = mongoose.Schema({
        user_id:{
            type: ObjectId,
            required: true
        },
        booking_id:{
            type: ObjectId,
            default:null
        },
        pnr_number:{
            type: String,
            unique: true,
            required: true
        },
        car_service_detail:{
            car_service_opted:{
            type: String,
            default: false
            },
            destination:{
            type: String
            },
            number_of_passengers:{
            type: Number,
            default:0
            },
            luggage_bags:{
            type: Number,
            default:0
            },
            number_of_cab:{
            type: Number,
            default:0
            },
            price:{
            type: Number,
            default:0
            }
        },
        total_amount: { type: Number },
        del_flag: { type: Boolean, default: false }
}, { timestamp: true })

module.exports = mongoose.model("Car_Service", carServiceSchema);
