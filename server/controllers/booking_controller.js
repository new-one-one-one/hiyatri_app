const Cab = require("../models/cab_model");
const Porter = require("../models/porter_model");
const Booking = require("../models/booking_model");
const Comments = require("../models/comment_model");
const Order = require("../models/order_model");
const { errorHandler } = require('../utils/dbErrorHandler');

module.exports.get_booking_by_id = (req, res) => {
    Booking.findById({ _id: req.params.booking_id })
     .populate("cab_service","cab_service_detail")
     .populate("porter_service","porter_service_detail")
     .exec((err, response) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
         res.status(200).json({
           response
         })
     })
}



var ObjectId = require('mongoose').Types.ObjectId;

f = (result) =>{
  const data = [];
  console.log("f called")
   result.forEach((r)=>{
              Booking.findById({"_id":ObjectId(r.booking)}, (err, new_result)=>{
                new_result["order_status"]=r.order_status;
                new_result["order_type:"]=r.order_type;
                new_result["payment_verified"]=r.payment_verified;
                data.push(new_result);
            })
        }
    )
  return data
}


exports.get_user_bookings = (req, res) =>{
  // finding by user object id
  Order.find({user : new ObjectId(req.params.user_id)}, async (err, result)=>{
    if(err)
      res.status(400).json({error : err})
    else{
      const data = [];
      console.log("f called")
      result.forEach((r)=>{
                  Booking.findById({"_id":ObjectId(r.booking)}, (err, new_result)=>{
                    new_result["order_status"]=r.order_status;
                    new_result["order_type:"]=r.order_type;
                    new_result["payment_verified"]=r.payment_verified;
                    data.push(new_result);
                })
            }
        )
      console.log(data);
      return Promise.all(data).then(()=> res.status(200).json(data));
    }
  })
}
