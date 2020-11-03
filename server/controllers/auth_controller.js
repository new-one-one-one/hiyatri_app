const User = require("../models/user_model");
const jwt = require('jsonwebtoken');


exports.authenticate = (req, res) => {
   const {phone_number} = req.body;
   User.findOne({ phone_number })
   .exec((err, response) => {
     if(err){
       return res.status(400).json({
         error: err
       })
     }
     if(!response){
       const newUser = User({phone_number});
       return newUser.save((err, result) => {
          if(err){
            return res.status(400).json({
              error: err
            })
          }
         const token = jwt.sign({_id: result._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
         res.cookie('token', token, { expiresIn: '7d' });
         const user = { _id: result._id, phone_number: result.phone_number}
         return res.status(200).json({
            message: "successfully authenticated",
            token: token,
            user: user,
         })
         res.status(200).json({ result })
       })
     }
     const token = jwt.sign({_id: response._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
     res.cookie('token', token, { expiresIn: '7d' });
     const user = { _id: response._id, phone_number: response.phone_number}
     return res.status(200).json({
        message: "successfully authenticated",
        token: token,
        user: user,
     })
   })
}
