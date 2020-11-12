const Order = require("../models/order_model");
const Booking = require("../models/booking_model");
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


//Create an instace of razorpay
var razorpay = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET
})


// CREATE PAYMENT
module.exports.create_order = (req,res) => {
 const { booking_id } = req.params;
 Booking.findOne({ _id: booking_id })
      .exec((err, response) => {
        if(err){
          res.status(400).json({
            error: err
          })
        }

   console.log(response)
        const options = {
        amount: 2*100,
        currency: "INR",
        receipt: uuidv4(),
        payment_capture: '1'
        };
    // initiate razorpay order
       razorpay.orders.create(options, async (err, rzp_order) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
        const newOrder = Order({
              booking: booking_id,
              amount: response.amount,
              pnr_number: response.pnr_number,
              razorpay_order_id: rzp_order.id
           })
           newOrder.save((err, result) => {
             if(err){
               return res.status(400).json({
                 error: err
               })
             }
             res.status(200).json({
               _id: rzp_order.id,
               message: "Order created successfuly"
             })
           })
        })
    })
}


// VERIFY PAYMENT
module.exports.verify_order = (req, res) => {
  const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
  console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature)
  // generate signature with razorpay_payment_id and razorpay_order_id
  let generatedSignature = crypto
                         .createHmac("SHA256",process.env.RAZORPAY_KEY_SECRET)
                         .update(razorpay_order_id + "|" + razorpay_payment_id)
                         .digest("hex");
  // match the razorpay signature with generated signature
  let isSignatureValid = generatedSignature == razorpay_signature;
  console.log(isSignatureValid)
if(isSignatureValid){
  //if generatedSignature matched with the given razorpay_signature then update the payment status to Verified
  const update_info = {razorpay_payment_id:  razorpay_payment_id, payment_verified: true}
  return   Order.findOneAndUpdate({ razorpay_order_id: razorpay_order_id },update_info,{ new: true })
        .exec((err, result) => {
          if(err || !result){
            return res.status(400).json({
              error: err
            })
          }
        return res.status(200).json({
          message: 'Payment verified successfuly',
          status:"ok"
        })
        })
  }
return res.status(400).json({
  message: 'Payment verification failed'
  })
}



module.exports.get_all_orders = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Order.find()
  .populate({ path: 'booking_id', select:'booking_information passenger_contact_information pnr_number passenger_details', populate: { path: 'car_service', select: 'car_service_detail'}})
  .populate({ path: 'booking_id', select:'booking_information passenger_contact_information pnr_number passenger_details', populate: { path: 'porter_service', select: 'porter_service_detail'}})
  .select('amount payment_verified booking_id razorpay_order_id')
  .sort({ updatedAt: -1 })
  .skip(skip)
  .limit(limit)
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

module.exports.get_single_order = (req, res) => {
  Order.findOne({ booking: req.params.booking_id })
  .populate({ path: 'booking', select:'booking_information passenger_contact_information pnr_number passenger_details booking_id', populate: { path: 'cab_service', select: 'cab_service_detail'}})
  .populate({ path: 'booking', select:'booking_information passenger_contact_information pnr_number passenger_details booking_id', populate: { path: 'porter_service', select: 'porter_service_detail'}})
  .select('amount payment_verified booking_id')
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
