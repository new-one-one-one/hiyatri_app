const CarService = require("../models/car_service_model");
const PorterService = require("../models/porter_service_model");
const Booking = require("../models/booking_model");
const Comments = require("../models/comment_model");
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


 function joinIt(a,b){
    b.push(a);
   return b
    
} 

exports.fetch_booking = (req, res) =>{
  const pnr = req.params.pnr;
  // findOne usage
  Booking.find({pnr_number:pnr}, (err, result)=>{
    if(err){
      return res.status(404).json(err);
    }
    else{
      Comments.find({pnr_number:pnr})
      .then(async(rest)=>{ return res.status(200).json(await joinIt(rest, result))}) ;
     
    }
  })
  
}


exports.fetch_all_booking= (req, res) =>{
  // findOne usage
  Booking
  .find()
  .select("booking_information.reservation_upto pnr_number")
  .exec((err, result) =>{
    if(err)
      res.status(400).json({error : err})
    else{
    
      res.status(200).json(result);
    }
  })
  
}
