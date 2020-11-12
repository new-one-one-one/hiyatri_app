const Cab = require("../models/cab_model");
const Porter = require("../models/porter_model");
const Booking = require("../models/booking_model");
const Comments = require("../models/comment_model");
const { errorHandler } = require('../utils/dbErrorHandler');

const pad = (number, length) => {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

exports.create_booking = (req, res) => {
    const {
    user,
    pnr_number,
    booking_information,
    passenger_contact_information,
    passenger_details,
    cab_service_detail,
    porter_service_detail,
    } = req.body;

    const newCab = Cab({
          user,
          pnr_number,
          cab_service_detail
        })

      newCab.save((err, cab) => {
          if(err){
            return res.status(400).json({
            error: err
            })
          }
          const newPorter = Porter({
                user,
                pnr_number,
                porter_service_detail  })

            newPorter.save(async (err, porter) => {
                  if(err){
                    return res.status(400).json({
                    error: err
                    })
                  }

              const booking_id = booking_information.is_arrival ?
              "Arr_" + pad(await Booking.countDocuments()+1, 10):
              "Dep_" + pad(await Booking.countDocuments()+1, 10);

              const newBooking = Booking({
                    user,
                    pnr_number,
                    booking_id,
                    booking_information,
                    passenger_contact_information,
                    passenger_details,
                    cab_service: cab._id,
                    porter_service: porter._id })

                newBooking.save((err, response) => {
                    if(err){
                      return res.status(400).json({
                      error: err
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
