const { isValidObjectId } = require("mongoose");
const Booking = require("../models/booking_model");

const dataObj = {
  pnr_number : 'PNR2313ON321',
  user_id : ObjectId(),
  booking_information : {
    train_no : '03308',
    train_name: 'G Satluj Exp Spl',
    is_arrival: 1,
    station: 'Nizamuddin',
    time: 'DATE'
  },
  passenger_contact_information:{
    primary_contact_number: '321321321321',
    secondary_contact_number: '43432432432',
    email_id: '321321@321.com'
  },
  passenger_details: [{
    seat_number: 'B7LB36',
    passenger_name: 'Ram Sahara Anand',
    age_group: ObjectId(),
    gender: ObjectId(),
    meet_and_greet: 0,
    wheel_chair: 0,
    golf_cart: 0
  },
  {
    seat_number: 'B7LB37',
    passenger_name: 'Darshana',
    age_group: '5-18',
    gender: 'Male',
    meet_and_greet: 0,
    wheel_chair: 0,
    golf_cart: 0
  },
  {
    seat_number: 'B7LB32',
    passenger_name: 'Amit',
    age_group: '5-18',
    gender: 'Male',
    meet_and_greet: 0,
    wheel_chair: 0,
    golf_cart: 0
  }],
  car_service_opted: 1,
  car_service_detail:{
    destination: 'Delhi',
    number_of_passengers: 1,
    luggage_bags: 2,
    number_of_cab: 1,
    price: 300
  },
  status: 1,
  del_flag: 0
}

exports.booking = (req, res) => {
  //  const {dataObj} = req.body;
  try {
    const booking = new Booking(dataObj);
    const result = await booking.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
}
