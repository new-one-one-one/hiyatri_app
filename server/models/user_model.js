const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{
    type:String,
    trim:true,
    max:32,
    default:""
  },
  email:{
    type:String,
    trim:true,
    lowercase:true,
    default:""
  },
  phone_number:{
    type:String,
    required:true,
    unique:true,
    max:20,
  },
  user_type:{
    type:String,
    enum:['USER','AGENT','ADMIN', 'SUPER_ADMIN'],
    default:'USER'
  },
  del_flag:{
    type:Boolean,
    default:false
  }
}, { timestamp:true })

module.exports = mongoose.model("User", userSchema);
