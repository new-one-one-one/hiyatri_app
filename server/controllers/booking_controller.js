const CarService = require("../models/car_service_model");
const PorterService = require("../models/porter_service_model");
const Booking = require("../models/booking_model");
const { errorHandler } = require('../utils/dbErrorHandler');



exports.create_booking = (req, res) => {
    const {
    user_id,
    pnr_number,
    booking_information,
    passenger_contact_information,
    passenger_details,
    car_service_detail,
    porter_service_detail,
    } = req.body;

    const newCarService = CarService({
          user_id,
          pnr_number,
          car_service_detail })

      newCarService.save((err, carService) => {
      if(err){
        return res.status(400).json({
        error: errorHandler(err)
        })
      }

      const newPorterService = PorterService({
            user_id,
            pnr_number,
            car_service_detail  })

        newPorterService.save((err, porterService) => {
        if(err){
          return res.status(400).json({
          error: errorHandler(err)
          })
        }

        const newBooking = Booking({
              user_id,
              pnr_number,
              booking_information,
              passenger_contact_information,
              passenger_details,
              car_service: carService._id,
              porter_service: porterService._id })

          newBooking.save((err, response) => {
              if(err){
                return res.status(400).json({
                error: errorHandler(err)
                })
              }
              return res.status(200).json({
              message:"Booking successfully created"
            })
         })
      })
   })
}

exports.get_booking_by_pnr = (req, res) => {
   const { pnr } = req.params;
   Booking.findOne({ pnr_number: pnr })
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
