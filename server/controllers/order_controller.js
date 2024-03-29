const Order = require("../models/order_model");
const User = require("../models/user_model");
const Booking = require("../models/booking_model");
const Cab = require("../models/cab_model");
const Porter = require("../models/porter_model");
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const request = require('request');
const moment = require("moment");
const { send_email } = require('../utils/sendEmail');

//Create an instace of razorpay
var razorpay = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET
})

const pad = (number, length) => {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

// CREATE PAYMENT
module.exports.create_order = async (req,res) => {
  const {
  user,
  total_amount,
  pnr_number,
  coupon,
  booking_information,
  passenger_contact_information,
  passenger_details,
  cab_service_detail,
  porter_service_detail,
} = req.body.order;

   console.log(req.body.order)
   await Cab({
     user,
     pnr_number,
     cab_service_detail
   })
   .save(async (err, cab) => {
   if(err){
     return res.status(400).json({
     error: err
     })
   }

    await Porter({
     user,
     pnr_number,
     porter_service_detail
   })
   .save(async (err, porter) => {
       if(err){
         return res.status(400).json({
         error: err
         })
       }

  const booking_id = booking_information.is_arrival ?
  "Arr_" + pad(await Booking.countDocuments()+1, 5):
  "Dep_" + pad(await Booking.countDocuments()+1, 5);

     await Booking({
     user,
     pnr_number,
     booking_id,
     coupon,
     total_amount,
     booking_information,
     passenger_contact_information,
     passenger_details,
     cab_service: cab._id,
     porter_service: porter._id
    })
    .save(async (err, booking) => {
               if(err){
                 return res.status(400).json({
                 error: err
                 })
               }

               const options = {
               amount: total_amount*100,
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
              const order_type = booking.booking_information.is_arrival ? "Arrival":"Departure";

                await Order({
                     booking: booking._id,
                     order_type,
                     user:booking.user,
                     total_amount: booking.total_amount,
                     pnr_number: booking.pnr_number,
                     razorpay_order_id: rzp_order.id
                  })
                  .save(async (err, result) => {
                    if(err){
                      return res.status(400).json({
                        error: err
                      })
                    }
                   send_email('mailmeaktiwari@gmail.com', 'TEST', 'test', '<a>Test</a>').catch(console.error)
                   return res.status(200).json({
                     _id: rzp_order.id,
                     message: "Order created successfuly"
                   })
                })
             })
          })
      })
  })
}

module.exports.modify_order = (req, res) => {
      const {
      user,
      booking_id,
      total_amount,
      pnr_number,
      booking_information,
      passenger_contact_information,
      passenger_details,
      cab_service_detail,
      porter_service_detail,
    } = req.body.data;

    Booking.findOne({ booking_id})
      .exec((err, booking) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        Booking.findByIdAndUpdate(booking._id, {
          booking_information,
          total_amount,
          passenger_contact_information,
          passenger_details
        }, { new:true })
        .exec((err, updatedBooking) => {
          if(err){
            return res.status(400).json({
              error: err
            })
          }
          Cab.findByIdAndUpdate(booking.cab_service, { cab_service_detail }, { new:true })
          .exec((err, cabUpdated) => {
            if(err){
              return res.status(400).json({
                error: err
              })
            }
            Porter.findByIdAndUpdate(booking.porter_service, { porter_service_detail }, {new: true})
            .exec(async (err, porterUpdated) => {
              if(err){
                return res.status(400).json({
                  error: err
                })
              }
              Order.findOneAndUpdate({ booking: booking._id }, {modified_attempt: 1, total_amount: total_amount}, {new: true})
                .exec(async (err, orderUpdated) => {
                  if(err){
                    return res.status(400).json({
                      error: err
                    })
                  }
                  let difference = req.body.original - total_amount;
                     if(difference>0){
                       return razorpay.payments.refund(orderUpdated.razorpay_payment_id, {amount: difference*100}, async (err, refund) => {
                          if(err){
                            return res.status(400).json({
                              error: err
                            })
                          }
                      return res.status(200).json({
                         message:"Order modified and refund issued successfuly"
                         })
                      })
                     }
                    res.status(200).json({
                      message:"Order modified successfuly"
                   })
                })
             })
          })
       })
   })
}


// VERIFY PAYMENT
module.exports.verify_order = (req, res) => {
  const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
  let generatedSignature = crypto
                         .createHmac("SHA256",process.env.RAZORPAY_KEY_SECRET)
                         .update(razorpay_order_id + "|" + razorpay_payment_id)
                         .digest("hex");
  let isSignatureValid = generatedSignature == razorpay_signature;
if(isSignatureValid){
   const update_info = {razorpay_payment_id:  razorpay_payment_id, payment_verified: true, order_status:"ASSIGN_TO_ADMIN"}
  return   Order.findOneAndUpdate({ razorpay_order_id: razorpay_order_id },update_info,{ new: true })
        .populate("booking")
        .exec((err, result) => {
          if(err || !result){
            return res.status(400).json({
              error: err
            })
          }
          console.log(result)
          var options = {
            'method': 'POST',
            'url': `http://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/ADDON_SERVICES/SEND/TSMS`,
            formData: {
              'From': 'HIYBTS',
              'To': result.booking.passenger_contact_information.primary_contact_number,
              'TemplateName': 'bookingSuccessful',
              'VAR1':result.booking.passenger_contact_information.name,
              'VAR2':result.booking.booking_id,
              'VAR3': "https://hiyatri.com"
            }
          };
          request(options, function (error, response) {
            console.log(error)
            if (error) throw new Error(error);
            return res.status(200).json({
              message: 'Payment verified successfuly',
              status:"ok"
            })
          });
      })
  }
return res.status(400).json({
  message: 'Payment verification failed'
  })
}





// please send the detals of single order to the bookinf openeing --lazag

module.exports.get_single_order = (req, res) => {

  Order.findOne({ booking: req.params.booking_id })
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id additional_services total_amount',
              populate: { path: 'cab_service', select: 'cab_service_detail'}})
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id additional_services total_amount',
              populate: { path: 'porter_service', select: 'porter_service_detail'}})
  .populate({ path:'user',
              select:'name phone_number'
            })
  .select('amount payment_verified order_status agent booking_id additional_services total_amount')
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



module.exports.get_single_order_by_id = (req, res) => {
  Order.findById(req.params.order_id)
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id additional_services total_amount',
              populate: { path: 'cab_service', select: 'cab_service_detail'}})
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id additional_services total_amount',
              populate: { path: 'porter_service', select: 'porter_service_detail'}})
  .exec((err, response) => {
     if(err){
       return res.status(400).json({
         error: err
       })
     }


     const { booking_id,
             total_amount,
             booking_information,
             cab_service,
             passenger_details,
             porter_service,
             pnr_number,
             additional_services,
             passenger_contact_information } = response.booking;

     res.status(200).json({
       response: {
         booking_id,
         additional_services,
         total_amount:total_amount,
         booking_information,
         cab_service_detail: cab_service.cab_service_detail,
         porter_service_detail: porter_service.porter_service_detail,
         passenger_details,
         pnr_number,
         passenger_contact_information
       }
     })
  })
}


module.exports.get_all_orders = async (req, res) => {
  const { order_type, order_status} = req.body;
  if(!order_type && !order_status){
    return Order.find()
    .populate({ path: 'booking',
                select:'booking_information passenger_contact_information pnr_number passenger_details booking_id coupon additional_services total_amount' ,
                populate: { path: 'cab_service', select: 'cab_service_detail'}})
    .populate({ path: 'booking',
                select:'booking_information passenger_contact_information pnr_number passenger_details booking_id coupon additional_services total_amount',
                populate: { path: 'porter_service', select: 'porter_service_detail'}})
    .populate('agent', 'name phone_number')
    .select('order_type order_status total_amount')
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
                   agent: item.agent,
                   total_amount:item.total_amount,
                   // booking_details: item.booking,
                   additional_services:item.additional_services,
                   booking_id: item.booking.booking_id,
                   date: item.booking.booking_information.is_arrival ?
                   item.booking.booking_information.reservation_upto.date:
                   item.booking.booking_information.boarding_station.date,
                   time: item.booking.booking_information.is_arrival ?
                   item.booking.booking_information.reservation_upto.time:
                   item.booking.booking_information.boarding_station.time,
                   _id: item.booking._id,
                   coupon:item.booking.coupon

           }
      })
      return res.status(200).json({
        response: list
      })
    })
  }

  Order.find({ order_type, order_status, payment_verified: true })
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id additional_services total_amount',
              populate: { path: 'cab_service', select: 'cab_service_detail'}})
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id additional_services total_amount',
              populate: { path: 'porter_service', select: 'porter_service_detail'}})
  .populate('agent', 'name phone_number')
  .select('order_type order_status agent additional_services total_amount')
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
                 additional_services:item.additional_services,
                 agent: item.agent,
                 // booking_details: item.booking,
                 date: item.booking.booking_information.is_arrival ?
                       item.booking.booking_information.reservation_upto.date:
                       item.booking.booking_information.boarding_station.date,
                 time: item.booking.booking_information.is_arrival ?
                       item.booking.booking_information.reservation_upto.time:
                       item.booking.booking_information.boarding_station.time,
                 _id: item.booking._id
         }
    })

    res.status(200).json({
      response: list
    })
 })
}


module.exports.assign_agent = (req, res) => {
     const order_id = req.params.order_id;
     const agent_id = req.params.agent_id;
     Order.findByIdAndUpdate(order_id, {agent: agent_id, order_status:"ASSIGN_TO_AGENT"}, { new: true })
       .exec((err, result) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
         if(!result){
           return res.status(200).json({
             message: "Please provide valid orderId and agentId"
           })
         }
         res.status(200).json({
            result
         })
       })
}

module.exports.agent_list = (req, res) => {
   User.find({ user_type: "AGENT"})
     .exec((err, response) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
       return res.status(200).json({
         agents: response
       })
     })
}


module.exports.get_user_all_orders = (req, res) => {
  Order.find({ user: req.params.user })
  .sort({ createdAt: -1 })
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id total_amount',
              populate: { path: 'cab_service', select: 'cab_service_detail'}})
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id total_amount',
              populate: { path: 'porter_service', select: 'porter_service_detail'}})
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


module.exports.update_order_status = (req, res) => {
  const { orderId, order_status } = req.params;
  Order.findByIdAndUpdate(orderId, {order_status},{ new: true })
    .exec((err, response) => {
      if(err){
        return res.statud(400).json({
          error: err
        })
      }
      res.status(200).json({
        message: "Order status updated"
      })
    })
}



module.exports.get_orders_for_agent=(req, res)=>{
  const {agent_id}=req.params;
  Order.find({agent:agent_id})
  .sort({ updatedAt: -1 })
  .populate({ path: 'booking',
              select:'booking_information passenger_contact_information pnr_number passenger_details booking_id total_amount',
              populate: { path: 'porter_service', select: 'porter_service_detail'}})
  .exec((err, orders)=>{
    if(err)
      return res.statud(400).json({
        error: err
      })
    return res.status(200).json({
      message: "all order",
      orders:orders
    })
  })
}

module.exports.cancel_order = (req, res) => {
  const { orderId } = req.params;


  Order.findById(orderId)
    .populate("booking", "booking_information passenger_contact_information")
    .select("booking total_amount razorpay_payment_id")
    .exec((err, order) => {
      let common = order.booking.booking_information;
      let pickuptime = common.is_arrival ?
                       common.reservation_upto.date+" "+common.reservation_upto.time:
                       common.boarding_station.date+" "+common.boarding_station.time;
      let start = new Date(moment(Date.now()).format("YYYY-MM-DD h:mm"));
      let end = new Date(moment(pickuptime,"DD-MM-YYYY h:mm").format("YYYY-MM-DD h:mm"));
      const duration = moment(end).diff(moment(start),'hours');



      if(duration<0){
        return Order.findByIdAndUpdate(orderId, {order_status: "CANCELLED_BY_USER"},{ new: true })
          .populate("booking", "passenger_contact_information booking_id")
          .exec((err, response) => {
            if(err){
              return res.statud(400).json({
                error: err
              })
            }
            var options = {
              'method': 'POST',
              'url': `http://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/ADDON_SERVICES/SEND/TSMS`,
              formData: {
                'From': 'HYCANB',
                'To': response.booking.passenger_contact_information.primary_contact_number,
                'TemplateName': 'Booking cancellation',
                'VAR1':response.booking.passenger_contact_information.name,
                'VAR2':response.booking.booking_id,
              }
            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              return res.status(200).json({
                message: "Order Cancellled"
              })
            });
          })
      }
      if(duration>=24){
        //Full refund
        return razorpay.payments.refund(order.razorpay_payment_id, {amount: order.total_amount*100}, async (err, refund) => {
             if(err){
               return res.status(400).json({
                 error: err
               })
             }
             return Order.findByIdAndUpdate(orderId, {order_status: "CANCELLED_BY_USER"},{ new: true })
               .populate("booking", "passenger_contact_information booking_id")
               .exec((err, response) => {
                 if(err){
                   return res.statud(400).json({
                     error: err
                   })
                 }
                 var options = {
                   'method': 'POST',
                   'url': `http://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/ADDON_SERVICES/SEND/TSMS`,
                   formData: {
                     'From': 'HYCANB',
                     'To': response.booking.passenger_contact_information.primary_contact_number,
                     'TemplateName': 'Booking cancellation',
                     'VAR1':response.booking.passenger_contact_information.name,
                     'VAR2':response.booking.booking_id,
                   }
                 };
                 request(options, function (error, response) {
                   if (error) throw new Error(error);
                   return res.status(200).json({
                     status:"Order cancelled successfuly",
                     message:`refunded amount ${order.total_amount}`
                   })
                 });
               })
           })
      }
      if(duration>12 && duration< 24){
        let refund = order.total_amount*(0.5);
        return razorpay.payments.refund(order.razorpay_payment_id, {amount: refund*100}, async (err, refund) => {
             if(err){
               return res.status(400).json({
                 error: err
               })
             }
             return Order.findByIdAndUpdate(orderId, {order_status: "CANCELLED_BY_USER"},{ new: true })
               .populate("booking", "passenger_contact_information booking_id")
               .exec((err, response) => {
                 if(err){
                   return res.statud(400).json({
                     error: err
                   })
                 }

                 var options = {
                   'method': 'POST',
                   'url': `http://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/ADDON_SERVICES/SEND/TSMS`,
                   formData: {
                     'From': 'HYCANB',
                     'To': response.booking.passenger_contact_information.primary_contact_number,
                     'TemplateName': 'Booking cancellation',
                     'VAR1':response.booking.passenger_contact_information.name,
                     'VAR2':response.booking.booking_id,
                   }
                 };
                 request(options, function (error, response) {
                   if (error) throw new Error(error);
                   return res.status(200).json({
                     status:"Order cancelled successfuly",
                     message:`refunded amount ${refund}`
                    })
                 });
              })
           })
      }
        return Order.findByIdAndUpdate(orderId, {order_status: "CANCELLED_BY_USER"},{ new: true })
          .populate("booking", "passenger_contact_information booking_id")
          .exec((err, response) => {
            if(err){
              return res.statud(400).json({
                error: err
              })
            }

            var options = {
              'method': 'POST',
              'url': `http://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/ADDON_SERVICES/SEND/TSMS`,
              formData: {
                'From': 'HYCANB',
                'To': response.booking.passenger_contact_information.primary_contact_number,
                'TemplateName': 'Booking cancellation',
                'VAR1':response.booking.passenger_contact_information.name,
                'VAR2':response.booking.booking_id,
              }
            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              return res.status(200).json({
                status:"Order cancelled successfuly",
                message:`no refund`
              })
            });
        })
    })
}


module.exports.add_additional_services = (req, res) => {
    const { additional_services } = req.body;
    const { order_id } = req.params;
    if(!additional_services.comment){
      return res.status(400).json({
        error: "Comment is required"
      })
    }
    if(!additional_services.additional_amount){
      return res.status(400).json({
        error: "Additional amount is required"
      })
    }
    if(!order_id){
      return res.status(400).json({
        error: "Order id is required"
      })
    }
     Order.findOne({ _id: order_id })
      .exec((err, order) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        if(!order){
          return res.status(404).json({
            error: "Order not found with the given id"
          })
         }
      let final_cost = order.total_amount;
          final_cost = final_cost + additional_services.additional_amount;
          let additional = order.additional_services;
          additional.push(additional_services)
      Order.findByIdAndUpdate({ _id: order_id }, { additional_services: additional, total_amount: final_cost })
        .exec((err ,result) => {
          if(err){
            return res.status(400).json({
              error: err
            })
          }
          res.status(200).json({
            response: "Additional services added successfuly"
         })
      })
   })
}


module.exports.remove_additional_services = (req, res) => {
  const { additional_services_id } = req.body;
  const { order_id } = req.params;
  if(!additional_services_id){
    return res.status(400).json({
      error: "additional_services_id is required"
    })
  }
  if(!order_id){
    return res.status(400).json({
      error: "Order id is required"
    })
  }
   Order.findOne({ _id: order_id })
    .exec((err, order) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      if(!order){
        return res.status(404).json({
          error: "Order not found with the given id"
        })
       }
    let final_cost = order.total_amount;
       let find_order = order.additional_services.find((item) => item._id == additional_services_id);
       if(!find_order){
         return res.status(404).json({
           error:"additional service not found"
         })
       }
        final_cost = final_cost - find_order.additional_amount;
        let additional = order.additional_services;
        let filtered_additional_services = additional.filter(item => item._id != additional_services_id);
       Order.findByIdAndUpdate({ _id: order_id }, { additional_services: filtered_additional_services, total_amount: final_cost })
        .exec((err ,result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          response: "Additional services removed successfuly"
       })
    })
 })
}
