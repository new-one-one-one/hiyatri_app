const mongoose = require("mongoose");

const bulk_bookings_info = mongoose.Schema(
  {
    client_name: {
      type: String,
      required: true,
    },
    date_of_arrival_or_departure: {
      type: String,
      required: true,
    },
    time_of_arrival_or_departure: {
      type: String,
      required: true,
    },
    booking_type: {
      type: String,
      enum:["Arrival","Departure"],
      required: true,
    },
    bulk_booking_id: {
      type: String,
    },
    person_details: {
      type: String,
    },
    excel_file_name:{
      type:String
    },
    excelawslink:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bulk_Bookings_Requests", bulk_bookings_info);
