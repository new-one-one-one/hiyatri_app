const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const orderSchema = mongoose.Schema({
   booking: {
     type:ObjectId,
     ref:"Booking",
     unique:true
   },
   total_amount:{
     type:Number
   },
   agent: {
      type:ObjectId,
      ref:"User"
   },
   order_type:{
     type:String
   },
   order_status:{
     type:String,
     enum:['ASSIGN_TO_ADMIN', 'ASSIGN_TO_AGENT','IN_PROGRESS','DONE','CANCELLED'],
     default:'ASSIGN_TO_ADMIN'
   },
   payment_verified:{
     type:Boolean,
     default: false
   },
   razorpay_payment_id:{
     type:String,
   },
   razorpay_order_id:{
     type:String
   },
   del_flag:{
     type:Boolean,
     default:false
   },
}, { timestamp:true })

module.exports = mongoose.model("Order", orderSchema);
