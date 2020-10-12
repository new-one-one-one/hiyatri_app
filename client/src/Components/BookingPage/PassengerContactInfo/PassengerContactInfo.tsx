import React from "react";
import "../main.css";


const PassengerContactInfo = () => {

    return (
        <React.Fragment>
            {/* passenger's contact information */}
            <span>Passenger's Contact Information</span>
            <table width="100%" >
                <tr>
                    <th>Passenger Number*</th>
                    <th>Secondary Mobile No.</th>
                    <th>Email ID</th>

                </tr>
                <tr>
                    <td><input /></td>
                    <td><input /></td>
                    <td><input /></td>
                </tr>
            </table>
        </React.Fragment>
    );
}

export default PassengerContactInfo;