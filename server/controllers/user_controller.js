const { response } = require("express");
const User = require("../models/user_model");
// const twilioClient = require('twilio')(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH
// );


module.exports.update_user_profile = (req, res)=>{
  const {
    name,
    email,
  } = req.body
  console.log(req.body, "hi ther")


  User.findByIdAndUpdate(req.params.id, {name, email}, (err, result)=>{
    console.log(result);
    if(err){
     return res.status(404).json({msg:"Error in updation"})
    }
    else{
      return res.status(200).json({msg:"Profile updated successfully"})
    }
  })
}

module.exports.single_user = (req, res) => {
      console.log(req)
     User.findById(req.params.id, (err, result)=>{

      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        result: result
      })

     })
     
        
  
}


exports.get_user = (req, res) => {
    User.find({$or:[{user_type:{$eq:"ADMIN"}}, {user_type:{$eq:"AGENT"}}]}, (err, result)=>{
        if(err)
            return res.status(404).json(err)
        else
           return  res.status(200).json(result)
    })
}


exports.create_user = (req, res) => {
    const {
        name,
        phone_number,
        user_type
    }   =  req.body;
    User.findOneAndUpdate({phone_number:phone_number}, {name:name,user_type:user_type},(err, result) => {

       if(result){
         res.status(200).json({"status":"exits"})
       }
       else{
        const addUser = new User({
            name,
            phone_number,
            user_type
        })
        addUser.save((err, result) => {
            if(err){
              return res.status(400).json({
              error: errorHandler(err)
              })
        } else{
            res.status(200).json({"status":"success"})
        }})
       }

    })

}
// exports.create_user = (req, res) => {
//     const {
//         name,
//         phone_number,
//         user_type
//     }   =  req.body;
//     var password=Math.floor((Math.random() * 10000) + 1);
//     if(user_type==="AGENT"){
//       // generate random string or otp
//       twilioClient.messages.create({
//         from:"+14198710438",
//         to:"+91"+String(phone_number),
//         body:"Hi agent your password is - " +  password
//       }, (err, message)=>{
//         if(err)
//           console.log(err)
//         else{
//           console.log("message send successs");
//         }
//       })
//       User.findOneAndUpdate({phone_number:phone_number}, {name:name, user_type:user_type, password:password},(err, result) => {
//         if(result){
//           res.status(200).json({"status":"exits"})
//         }
//         else{
//           const addUser = new User({
//               name,
//               phone_number,
//               user_type,
//               password:password
//           })
//           console.log(addUser, password);
//           addUser.save((err, result) => {
//               if(err){
//                 return res.status(400).json({
//                 error: errorHandler(err)
//                 })
//           } else{
//               res.status(200).json({"status":"success"})
//           }})
//         }
//
//       })
//
//
//     }
//     else{
//       User.findOneAndUpdate({phone_number:phone_number}, {name:name, user_type:user_type},(err, result) => {
//         if(result){
//           res.status(200).json({"status":"exits"})
//         }
//         else{
//           const addUser = new User({
//               name,
//               phone_number,
//               user_type
//           })
//           addUser.save((err, result) => {
//               if(err){
//                 return res.status(400).json({
//                 error: errorHandler(err)
//                 })
//           } else{
//               res.status(200).json({"status":"success"})
//           }})
//         }
//
//       })
//   }
//
// }

exports.delete_user = (req, res) => {
    const {name,
    phone_number,
    user_type} = req.body;
    User.findOneAndUpdate({phone_number:phone_number}, {name:name,user_type:"USER"},(err, result)=>{
        if(err)
            res.status(404).json({"status":"error"})
        else{
            res.status(200).json({"status":"deleted"})
          }
    })
}
