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
       const order_type = response.booking_information.is_arrival ? "Arrival":"Departure"
        const newOrder = Order({
              booking: booking_id,
              order_type,
              total_amount: response.total_amount,
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


module.exports.get_all_orders = async (req, res) => {
  const { order_type, order_status} = req.body;
  if(!order_type && !order_status){
    return Order.find()
    .populate({ path: 'booking', select:'booking_information booking_id' })
    .populate({ path: 'booking', select:'booking_information booking_id' })
    .select('order_type order_status')
    .sort({ updatedAt: -1 })
    .exec((err, response) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      const list = response.map(item => {
          return { booking_status: item.order_status,
                   booking_type: item.order_type,
                   booking_id: item.booking.booking_id,
                   date: item.booking.booking_information.is_arrival?item.booking.booking_information.reservation_upto.date:item.booking.booking_information.boarding_station.date,
                   time: item.booking.booking_information.is_arrival?item.booking.booking_information.reservation_upto.time:item.booking.booking_information.boarding_station.time,
                   _id: item.booking._id
           }
      })
      return res.status(200).json({
        response: list
      })
    })
  }

  Order.find({ order_type, order_status, payment_verified: true })
  .populate({ path: 'booking', select:'booking_information booking_id' })
  .populate({ path: 'booking', select:'booking_information booking_id' })
  .select('order_type order_status')
  .sort({ updatedAt: -1 })
 .exec((err, response) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    const list = response.map(item => {
        return { booking_status: item.order_status,
                 booking_type: item.order_type,
                 booking_id: item.booking.booking_id,
                 date: item.booking.booking_information.is_arrival?item.booking.booking_information.reservation_upto.date:item.booking.booking_information.boarding_station.date,
                 time: item.booking.booking_information.is_arrival?item.booking.booking_information.reservation_upto.time:item.booking.booking_information.boarding_station.time,
                 _id: item.booking._id
         }
    })

    res.status(200).json({
      response: list
    })
 })
}
