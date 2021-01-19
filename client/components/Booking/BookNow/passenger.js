import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from 'react';
import {TextField,FormHelperText} from '@material-ui/core';
import Select from '@material-ui/core/Select';


const PassengerDetails = ({data, handleChange,register, errors}) => {
    const showPassengerDetail = () => {
          return data.passenger_details ? data.passenger_details.map(
            (item, index) => {
              let passenger_detail_seat_no = errors[`passenger_detail_seat_no${index}`];
              let passenger_detail_name = errors[`passenger_detail_name${index}`];
              let passenger_detail_age_group = errors[`passenger_detail_age_group${index}`];
              let passenger_detail_gender = errors[`passenger_detail_gender${index}`];
              return <tr key={index}>
                        <td>
                        <TextField
                         variant="outlined"
                         name={`passenger_detail_name${index}`}
                         placeholder="eg. CNF,S4,76"
                         value={item.seat_number}
                         onChange={handleChange("passenger_detail_seat_no", index)}
                         />
                        </td>
                        <td>
                         <TextField
                          variant="outlined"
                          name={`passenger_detail_name${index}`}
                          placeholder={item.passenger_name}
                          value={item.passenger_name}
                          onChange={handleChange("passenger_detail_name", index)}
                          inputRef={register({ required: true, minLength:2})}
                          error={passenger_detail_name ?true:false}
                          helperText={passenger_detail_name? "Passenger name is required":""}
                          />
                        </td>
                        <td>
                        <Select
                          variant="outlined"
                          name={`passenger_detail_age_group${index}`}
                          className="pl-2"
                          fullWidth
                          native
                          inputRef={register({ required: true })}
                          value={item.age_group}
                          onChange={handleChange("passenger_detail_age", index)}>
                          <option aria-label="None"  />
                          <option value="Sr citizen(above 60)">Sr citizen(above 60)</option>
                          <option value="Adult(12yrs-60yrs)">Adult(12yrs-60yrs)</option>
                          <option value="Children(upto 12 years)">Children(upto 12 years)</option>
                        </Select>
                        {passenger_detail_age_group && <FormHelperText style={{color:"red"}}>This is required!</FormHelperText>}
                        </td>
                        <td>
                        <Select
                          variant="outlined"
                          className="pl-2"
                          name={`passenger_detail_gender${index}`}
                          fullWidth
                          native
                          required={true}
                          inputRef={register({ required: true })}
                          value={item.gender}
                          onChange={handleChange("passenger_detail_gender", index)}>
                          <option aria-label="None" />
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                          {passenger_detail_gender && <FormHelperText style={{color:"red"}}>This is required!</FormHelperText>}
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
          <div className="Passenger-Details shadow">
              <table>
                <thead>
                  <tr>
                    <th style={{ width:"120px"}}>Seat No.</th>
                    <th style={{ width:"170px"}}>Passenger Name*</th>
                    <th>Age Group*</th>
                    <th style={{ width:"90px"}}>Gender*</th>
                    <th style={{ width:"100px"}}>Meet & Greet </th>
                    <th style={{ width:"100px"}}>Wheel Chair </th>
                    <th style={{ width:"100px"}}>Golf Cart </th>
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
