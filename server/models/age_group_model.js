const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ageGroupSchema = mongoose.Schema({
   name:{
     type:String,
     unique:true,
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

module.exports = mongoose.model("Age_Group", ageGroupSchema);
