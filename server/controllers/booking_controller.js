const Cab = require("../models/cab_model");
const Porter = require("../models/porter_model");
const Booking = require("../models/booking_model");
const Comments = require("../models/comment_model");
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
