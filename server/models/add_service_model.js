const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const orderSchema = mongoose.Schema({
    booking: {
      type:ObjectId,
      ref:"Booking",
      unique:true
    },
    additional_services:{
        note:{
            type: String,
            default:null
        },
        price:{
        type:Number, 
        default:0
        }
  }
})