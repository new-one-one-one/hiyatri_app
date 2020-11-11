const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{
    type:String,
    trim:true,
    max:32
  },
  email:{
    type:String,
    trim:true,
    lowercase:true
  },
  phone_number:{
    type:String,
    required:true,
    unique:true,
    max:20,
  },
  user_type:{
    type:String,
    enum:['USER','AGENT','ADMIN'],
    default:'USER'
  },
  del_flag:{
    type:Boolean,
    default:false
  }
}, { timestamp:true })

module.exports = mongoose.model("User", userSchema);
