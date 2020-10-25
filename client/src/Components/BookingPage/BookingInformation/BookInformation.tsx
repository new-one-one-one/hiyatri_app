import React from "react";
import "../main.css";

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
            <td>03308</td>
            <td>G Satluj Exp Spl</td>
            <td>Nizamuddin</td>
            <td>23:05</td>
            <td>11-10-2020</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingInformation;
