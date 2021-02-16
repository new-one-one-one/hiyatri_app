const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const orderSchema = mongoose.Schema({
   booking: {
     type:ObjectId,
     ref:"Booking",
     unique:true
   },
   user:{
     type:ObjectId,
     ref:"User"
   },
   // add additonal service total amount 
   total_amount:{
     type:Number,
     default:null
   },
   agent: {
      type:ObjectId,
      ref:"User",
      default:null
   },
   order_type:{
     type:String,
     default:null
   },
   order_status:{
     type:String,
     enum:['ASSIGN_TO_ADMIN',
           'ASSIGN_TO_AGENT',
           'IN_PROGRESS',
           'COMPLETED',
           'FAILED',
           'CANCELLED_BY_ADMIN',
           'CANCELLED_BY_AGENT',
           'CANCELLED_BY_USER',
           'NO_SHOW'],
     default:'FAILED'
   },
   payment_verified:{
     type:Boolean,
     default: false
   },
   razorpay_payment_id:{
     type:String,
     default:null
   },
   razorpay_order_id:{
     type:String,
     default:null
   },
   modified_attempt: {
    type: Number,
    default:0
   },
   del_flag:{
     type:Boolean,
     default:false
   },
}, { timestamps:true })

module.exports = mongoose.model("Order", orderSchema);
