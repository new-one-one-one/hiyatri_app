import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from 'react';
import {TextField} from '@material-ui/core';
import Select from '@material-ui/core/Select';


const PassengerDetails = ({data, handleChange,register, errors}) => {
    const showPassengerDetail = () => {
          return data.passenger_details ? data.passenger_details.map(
            (item, index) => {
              return <tr key={index}>
                        <td>
                          {item.seat_number}
                        </td>
                        <td>
                         <TextField
                          variant="outlined"
                          name="passenger_detail_name"
                          placeholder={item.passenger_name}
                          onChange={handleChange("passenger_detail_name", index)}
                          inputRef={register({ required: true, minLength:2})}
                          error={errors.passenger_detail_name ?true:false}
                          helperText={errors.passenger_detail_name? "Passenger name is required":""}
                          />
                        </td>
                        <td>
                        <Select
                          variant="outlined"
                          className="pl-2"
                          fullWidth
                          native
                          value={item.age}
                          onChange={handleChange("passenger_detail_age", index)}>
                          <option aria-label="None" value="" />
                          <option value="option1">Sr citizen (above 60)</option>
                          <option value="option2">Adult(12yrs -60yrs)</option>
                        </Select>
                        </td>
                        <td>
                        <Select
                          variant="outlined"
                          className="pl-2"
                          fullWidth
                          native
                          value={item.gender}
                          onChange={handleChange("passenger_detail_gender", index)}>
                          <option aria-label="None" value="" />
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                        </td>
                        <td>
                          <span>Yes</span>
                          <Switch
                           color="primary"
                           checked={item.meet_and_greet}
                           onChange={handleChange("passenger_detail_meet_and_greet", index)}/>
                          <span>No</span>
                        </td>
                        <td>
                          <span>Yes</span>
                          <Switch
                          color="primary"
                           checked={item.wheel_chair}
                           onChange={handleChange("passenger_detail_wheel_chair", index)}  />
                           <span>No</span>
                        </td>
                        <td>
                          <span>Yes</span>
                          <Switch
                          color="primary"
                           checked={item.golf_cart}
                           onChange={handleChange("passenger_detail_golf_cart", index)} />
                           <span>No</span>
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
