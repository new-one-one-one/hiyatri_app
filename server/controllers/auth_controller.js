const User = require("../models/user_model");
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports.send_otp = (req, res) => {
  const { phone_number } =  req.body;
  if(!phone_number){
    return res.status(400).json({
      error: "Phone number is required"
    })
  }

  if(!(parseInt(phone_number.toString().length) === 10)){
    return res.status(400).json({
      error: "Phone number is not valid"
    })
  }

  axios(`${process.env.TWOFACTOR_BASE_URL}/${process.env.TWOFACTOR_API_KEY}/SMS/${phone_number}/AUTOGEN`)
    .then(response => {
      return res.status(200).json({
         message: `OTP has been sent to ${phone_number}`,
         session_id: response.data.Details
      })
  })
    .catch(err => {
      return res.status(400).json({
      error: 'Phone number is incorrect'
      })
  })
}



module.exports.verify_otp = async (req, res) => {
  const { session_id, otp_code ,phone_number, key } =  req.body;
  console.log(session_id, otp_code, phone_number)
  if(!otp_code){
    return res.status(400).json({
      error: "OTP is required"
    })
  }

  if(!session_id){
    return res.status(400).json({
      error: "Session id is required"
    })
  }

  if(!phone_number){
    return res.status(400).json({
      error: "Phone number is required"
    })
  }

  if(!(parseInt(phone_number.toString().length) === 10)){
    return res.status(400).json({
      error: "Phone number is not valid"
    })
  }


  axios(`${process.env.TWOFACTOR_BASE_URL}/${process.env.TWOFACTOR_API_KEY}/SMS/VERIFY/${session_id}/${otp_code}`)
    .then(response => {

  if(response.data.Details === "OTP Expired"){
    return res.status(400).json({
          error: "OTP is expired"
        })
  }

  User.findOne({ phone_number: phone_number })
    .exec((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      if(!result){
        const newUser = User({ phone_number })
        return newUser.save((err, data) => {
          if(err){
            return res.status(400).json({
              error: err
            })
          }
          const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
          res.cookie('token', token, { expiresIn: '7d' });
          const user = { _id: data._id, phone_number: data.phone_number, user_type: data.user_type}
          return res.status(200).json({
             message: "Verified successfuly",
             token: token,
             user: user,
          })
        })
      }
      const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { expiresIn: '7d' });
      const user = { _id: result._id, phone_number: result.phone_number, user_type: result.user_type }
      return res.status(200).json({
           message: "Verified successfuly",
           token: token,
           user: user,
        })
      })
     }
  )
    .catch(err => {
      return res.status(400).json({
        error: "OTP is incorrect"
      })
   })
}
