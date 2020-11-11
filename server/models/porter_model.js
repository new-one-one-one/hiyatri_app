const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const porterSchema = mongoose.Schema({
        user:{
            type:ObjectId,
            required:true
        },
        booking_id:{
            type:ObjectId,
        },
        pnr_number:{
            type:String,
            required:true
        },
        porter_service_detail:{
            porter_service_opted:{
              type:Boolean,
              default:false
            },
            number_of_large_bags:{
              type:Number,
              default:0
            },
            number_of_medium_bags:{
              type:Number,
              default:0
            },
            number_of_small_bags:{
              type:Number,
              default:0
            },
            total_amount:{
              type:Number,
              default:0
            },
        },
      del_flag:{
        type:Boolean,
        default:false
      }
}, { timestamp:true })

module.exports = mongoose.model("Porter", porterSchema);
