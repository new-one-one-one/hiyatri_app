const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const userSchema = mongoose.Schema({
  name:{
    type: String,
    trim: true,
    max: 32
  },
  // email:{
  //   type: String,
  //   trim: true,
  //   lowercase: true
  // },
  phone_number:{
    type: String,
    required: true,
    unique:true,
    max:20,
  },
  user_type: String,
  del_flag:{
    type: Boolean,
    default: false
  }

})

module.exports = mongoose.model("User", userSchema);
