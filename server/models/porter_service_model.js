const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const porterServiceSchema = mongoose.Schema({
        user_id:{
            type: String,
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
        porter_service_detail:{
            porter_service_opted:{
            type: Boolean,
            default: false
            },
            number_of_large_bags:{
            type: Number,
            default:0
            },
            number_of_medium_bags:{
            type: Number,
            default:0
            },
            number_of_small_bags:{
            type: Number,
            default:0
            },
            price:{
            type: Number,
            default:0
            },
        },
      del_flag: { type: Boolean, default: false }
}, { timestamp: true })

module.exports = mongoose.model("Porter_Service", porterServiceSchema);
