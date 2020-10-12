import React from "react";
import "../main.css";

const BookingInformation = () => {

    return (
        <React.Fragment>
            <span>Booking Information</span>
            {/* booking information table */}
            <table width="100%" >
                <tr>
                    <th>Train No.</th>
                    <th>Train Name</th>
                    <th>Arrival Station</th>
                    <th>Arrival Time</th>
                    <th>Arrival Date</th>
                </tr>
                <tr>
                    <td>03308</td>
                    <td>G Satluj Exp Spl</td>
                    <td>Nizamuddin</td>
                    <td>23:05</td>
                    <td>11-10-2020</td>
                </tr>
            </table>
        </React.Fragment>

    )
}

export default BookingInformation;