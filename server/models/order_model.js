const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const orderSchema = mongoose.Schema({
   booking_id: {
     type:ObjectId,
     ref:"Booking"
   },
   razorpay_payment_id:{
     type: String,
   },
   razorpay_order_id:{
     type: String
   },
   payment_verified:{
     type: Boolean,
     default: false
   },
   del_flag:{
     type:Boolean,
     default: false
   },
}, { timestamp: true })

module.exports = mongoose.model("Order", orderSchema);
