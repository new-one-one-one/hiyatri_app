const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

 
const userSchema = mongoose.Schema({
  name:{
    type: String,
    trim: true,
    required: true,
    max: 32
  },
  email:{
    type: String,
    trim: true,
    lowercase: true
  },
  mobile_number:{
    type: String,
    required: true,
    unique:true,
    max:20,
  },
  user_type:{
    type: ObjectId,
    ref:"User_Type",
    required:true
  }.
  del_flag:{
    type: Boolean,
    default: false;
  }

}, { timestamp: true })

module.exports = mongoose.model("User", userSchema);
