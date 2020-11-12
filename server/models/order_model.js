const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const orderSchema = mongoose.Schema({
   booking: {
     type:ObjectId,
     ref:"Booking",
     unique:true
   },
   razorpay_payment_id:{
     type:String,
   },
   razorpay_order_id:{
     type:String
   },
   payment_verified:{
     type:Boolean,
     default: false
   },
   agent: {
      type:ObjectId,
      ref:"User"
   },
   del_flag:{
     type:Boolean,
     default:false
   },
}, { timestamp:true })

module.exports = mongoose.model("Order", orderSchema);
