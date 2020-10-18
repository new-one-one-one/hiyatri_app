const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const userTypeSchema = mongoose.Schema({
   name:{
     type:String,
     trim:true,
     max:32,
     required:true,
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

module.exports = mongoose.model("User_Type", userTypeSchema);
