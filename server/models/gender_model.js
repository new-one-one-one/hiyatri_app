const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
 

const genderSchema = mongoose.Schema({
   name:{
     type:String,
     unique:true,
     lowercase: true,
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

module.exports = mongoose.model("Gender", genderSchema);
