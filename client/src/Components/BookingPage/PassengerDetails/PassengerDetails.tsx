import React from "react";
import "../main.css";
import Switch from "@material-ui/core/Switch";
import { SampleResponse } from "../sampleResponse";

interface passengersProps {
  handleChange: any;
  handleBlur: any;
  values: any;
  errors: any;
  touched: any;
  otherServices1: any;
  otherServices2: any;
  otherServices3: any;
  otherServices4: any;
  toggler: any;
}

const PassengerDetails = (props: passengersProps) => {
  return (
    <div className="Passenger-Details">
      {/* passenger's contact information */}
      <table>
        <thead>
          <tr>
            <th>Seat No.</th>
            <th>Passenger Name</th>
            <th>Age Group</th>
            <th>Gender</th>
            <th>
              Meet & Greet *<br />
              (500 Per Person)
            </th>
            <th>
              Wheel Chair
              <br />
              (80 Per Person)
            </th>
            <th>
              Golf Cart
              <br />
              (80 Per Person)
            </th>
          </tr>
        </thead>
        <tbody>
         
            {SampleResponse.pnr_details.pass_info.map(
              (eachPassenger, index) => {
                return <tr key={index}>
                  <td>{eachPassenger.booking_status_details}</td>
                  <td>
                    <input placeholder={eachPassenger.passenger_name} />
                  </td>
                  <td>
                    <select>
                      <option value="option1">Sr citizen (above 60)</option>
                      <option value="option2">Adult(12yrs -60yrs)</option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </td>
                  <td>
                    <div >
                      <span>No</span>

                      <Switch name="firstRow" onChange={props.toggler} />

                      <span>Yes</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>No</span>

                      <Switch name="SecondRow" onChange={props.toggler} />

                      <span>Yes</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>No</span>

                      <Switch name="ThirdRow" onChange={props.toggler} />

                      <span>Yes</span>
                    </div>
                  </td>
                </tr>;
              }
            )}
        
        </tbody>
      </table>
    </div>
  );
};
export default PassengerDetails;
