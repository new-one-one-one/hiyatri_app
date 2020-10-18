const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const bookingStatusSchema = mongoose.Schema({
   name:{
     type:String,
     unique:true,
     required:true,
     max:32,
   },
   value:{
     type:String,
     required:true
   },
   del_flag:{
     type:Boolean,
     default: false
   }
}, { timestamp: true })

module.exports = mongoose.model("Booking_Status", bookingStatusSchema);
