import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from 'react';


const PassengerDetails = ({data, handleChange}) => {
    const showPassengerDetail = () => {
          return data.passenger_details ? data.passenger_details.map(
            (item, index) => {
              return <tr key={index}>
                        <td>
                          {item.seat_number}
                        </td>
                        <td>
                         <input placeholder={item.passenger_name}
                          value={item.passenger_name}
                          onChange={handleChange("passenger_detail_name", index)} />
                        </td>
                        <td>
                          <select onChange={handleChange("passenger_detail_age", index)}>
                            <option value="option1">Sr citizen (above 60)</option>
                            <option value="option2">Adult(12yrs -60yrs)</option>
                          </select>
                        </td>
                        <td>
                          <select value={item.gender} onChange={handleChange("passenger_detail_gender", index)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </td>
                        <td>
                          <Switch
                           onChange={handleChange("passenger_detail_meet_and_greet", index)}/>
                        </td>
                        <td>
                          <Switch
                           onChange={handleChange("passenger_detail_wheel_chair", index)}  />
                        </td>
                        <td>
                          <Switch
                           onChange={handleChange("passenger_detail_golf_cart", index)} />
                        </td>
                    </tr>
               }
           ) : null;
        }

  return <>
          <div className="Passenger-Details">
              <table>
                <thead>
                  <tr>
                    <th>Seat No.</th>
                    <th>Passenger Name</th>
                    <th>Age Group</th>
                    <th>Gender</th>
                    <th>Meet & Greet *<br />(500 Per Person)</th>
                    <th>Wheel Chair<br />(80 Per Person)</th>
                    <th>Golf Cart<br />(80 Per Person)</th>
                  </tr>
                </thead>
              <tbody>
               {showPassengerDetail()}
              </tbody>
              </table>
          </div>
         </>
 };
export default PassengerDetails;
