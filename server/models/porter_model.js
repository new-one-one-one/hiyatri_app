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
            baggage_garanteed:{
              baggage_garanteed_opted:{
                type:Boolean,
                default:false
              },
              large_bags:{
                 unit: Number,
                 total: Number
              },
              medium_bags:{
                unit: Number,
                total: Number
              },
              small_bags:{
                unit: Number,
                total: Number
              },
            },
            porter_service_opted:{
              type:Boolean,
              default:false
            },
            large_bags:{
               unit: Number,
               total: Number
            },
            medium_bags:{
              unit: Number,
              total: Number
            },
            small_bags:{
              unit: Number,
              total: Number
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
}, { timestamps:true })

module.exports = mongoose.model("Porter", porterSchema);
