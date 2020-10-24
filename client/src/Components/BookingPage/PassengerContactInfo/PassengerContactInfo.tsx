import React from "react";
import "../main.css";



interface PassengerProps {
    handleChange: any;
    handleBlur: any;
    values: any;
    errors: any;
    touched: any
}

const PassengerContactInfo = (props: PassengerProps) => {

    return (
        <div className="contact-Information">
            {/* passenger's contact information */}
           
            <table width="100%" >
                <thead>

                <tr>
                    <th>Passenger Number*</th>
                    <th>Secondary Mobile No.</th>
                    <th>Email ID</th>

                </tr>
                </thead>
              
              <tbody>

              <tr>
                    <td><input className="input-fields" name="PassengerNumber" onChange={props.handleChange} value={props.values.PassengerNumber} onBlur={props.handleBlur} type="Number" />

                        <span className="errors"> {props.errors.PassengerNumber && props.touched.PassengerNumber && props.errors.PassengerNumber}</span>
                    </td>
                    <td><input className="input-fields" type="Number" onChange={props.handleChange} /></td>
                    <td>
                        <input className="input-fields" name="email" value={props.values.email} type="email" onChange={props.handleChange} />

                    </td>
                </tr>
              </tbody>
           
            </table>
        </div>
    );
}

export default PassengerContactInfo;