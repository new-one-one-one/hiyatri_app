import React from "react";
import "../main.css";
import { SampleResponse } from "../sampleResponse";

interface IbookingProps {
  handleChange: any;
  handleBlur: any;
  values: any;
  errors: any;
  touched: any;
}

const BookingInformation = (props: IbookingProps) => {
  return (
    <div className="booking-Information">
      {/* booking information table */}
      <table>
        <thead>
          <tr>
            <th>Train No.</th>
            <th>Train Name</th>
            <th>Arrival Station</th>
            <th>Arrival Time</th>
            <th>Arrival Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{SampleResponse.pnr_details.train_number}</td>
            <td>{SampleResponse.pnr_details.train_name}</td>
            <td>{SampleResponse.pnr_details.reservation_upto.station_name}</td>
            <td>{SampleResponse.pnr_details.reservation_upto.time}</td>
            <td>{SampleResponse.pnr_details.reservation_upto.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingInformation;
