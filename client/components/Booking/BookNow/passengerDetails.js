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
                          value={item.passenger_name}
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
                          value={item.age_group}
                          onChange={handleChange("passenger_detail_age", index)}>
                          <option aria-label="None" value="" />
                          <option value="Sr citizen(above 60)">Sr citizen(above 60)</option>
                          <option value="Adult(12yrs-60yrs)">Adult(12yrs-60yrs)</option>
                          <option value="Children(upto 12 years)">Children(upto 12 years)</option>
                        </Select>
                        </td>
                        <td>
                        <Select
                          variant="outlined"
                          className="pl-2"
                          fullWidth
                          native
                          required={true}
                          value={item.gender}
                          onChange={handleChange("passenger_detail_gender", index)}>
                          <option aria-label="None" value="" />
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                        </td>
                        <td>
                          <span>No</span>
                          <Switch
                           color="primary"
                           checked={item.meet_and_greet}
                           onChange={handleChange("passenger_detail_meet_and_greet", index)}/>
                          <span>Yes</span>
                        </td>
                        <td>
                          <span>No</span>
                          <Switch
                           color="primary"
                           checked={item.wheel_chair}
                           onChange={handleChange("passenger_detail_wheel_chair", index)}  />
                           <span>Yes</span>
                        </td>
                        <td>
                          <span>No</span>
                          <Switch
                          color="primary"
                           checked={item.golf_cart}
                           onChange={handleChange("passenger_detail_golf_cart", index)} />
                           <span>Yes</span>
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
                    <th>Passenger Name*</th>
                    <th>Age Group*</th>
                    <th>Gender*</th>
                    <th>Meet & Greet </th>
                    <th>Wheel Chair </th>
                    <th>Golf Cart </th>
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
