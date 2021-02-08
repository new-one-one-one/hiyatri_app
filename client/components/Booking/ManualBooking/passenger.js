import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from 'react';
import {TextField,FormHelperText} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InfoIcon from '@material-ui/icons/Info';
import {Button,Box} from '@material-ui/core';
import { IconInformation } from "../../iconInformation";
import { Controller } from "react-hook-form";


const PassengerDetails = ({data, handleChange,register, errors, remove, addPassenger}) => {
  const showPassengerDetail = () => {
          return data.passenger_details ? data.passenger_details.map(
            (item, index) => {
              let passenger_detail_seat = errors[`passenger_detail_seat${index}`];
              let passenger_detail_name = errors[`passenger_detail_name${index}`];
              let passenger_detail_age_group = errors[`passenger_detail_age_group${index}`];
              let passenger_detail_gender = errors[`passenger_detail_gender${index}`];
              return <tr key={index}>
                        <td>
                        <TextField
                        id="input-fixed-height"
                         variant="outlined"
                         name={`passenger_detail_seat${index}`}
                         value={item.seat_number}
                         onChange={handleChange("passenger_detail_seat", index)}
                         inputRef={register({ required: true, minLength:2})}
                         error={ passenger_detail_seat?true:false}
                         helperText={passenger_detail_seat? "required":""}
                         />

                        </td>
                        <td>
                         <TextField
                         id="input-fixed-height"
                          variant="outlined"
                          name={`passenger_detail_name${index}`}
                          placeholder={item.passenger_name}
                          value={item.passenger_name}
                          onChange={handleChange("passenger_detail_name", index)}
                          inputRef={register({ required: true})}
                          error={ passenger_detail_name?true:false}
                          helperText={passenger_detail_name? "required":""}
                          />

                        </td>
                        <td>
                        <Select
                          variant="outlined"
                          style={{  height: "55px",borderRadius: "20px"}}
                          name={`passenger_detail_age_group${index}`}
                          className="pl-1"
                          fullWidth
                          native
                          inputRef={register({ required: true })}
                          value={item.age_group}
                          onChange={handleChange("passenger_detail_age", index)}>
                          <option aria-label="None"  />
                          <option value="Sr citizen(above 60)">Sr citizen (above 58 years)</option>
                          <option value="Adult(12yrs-60yrs)">Adult (12-58 years)</option>
                          <option value="Children(upto 12 years)">Children (upto 12 years)</option>
                        </Select>
                        {passenger_detail_age_group && <FormHelperText style={{color:"red"}}>required</FormHelperText>}
                        </td>
                        <td>
                        <Select
                          variant="outlined"
                          className="pl-2"
                          style={{  height: "55px",borderRadius: "20px"}}
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
                          {passenger_detail_gender && <FormHelperText style={{color:"red"}}>required</FormHelperText>}
                        </td>
                        <td>

                          <Switch
                           color="primary"
                           checked={item.meet_and_greet}
                           onChange={handleChange("passenger_detail_meet_and_greet", index)}/>

                        </td>
                        <td>

                          <Switch
                           color="primary"
                           checked={item.wheel_chair}
                           onChange={handleChange("passenger_detail_wheel_chair", index)}  />

                        </td>
                        <td>

                          <Switch
                          color="primary"
                           checked={item.golf_cart}
                           onChange={handleChange("passenger_detail_golf_cart", index)} />

                        </td>
                        <td>
                        <Button type="button" id={data.passenger_details.length==1?"disable-btn":"yes-btn"} disabled={data.passenger_details.length==1?true:false} variant="contained" onClick={() => remove(index)}>
                            Remove
                        </Button>
                        </td>
                    </tr>
               }
           ):null;
        }

  return <>
          <div className="Passenger-Details shadow">
              <table>
                <thead>
                  <tr>
                    <th style={{ width:"120px"}}>Seat No.</th>
                    <th style={{ width:"160px"}}>Passenger Name*</th>
                    <th style={{ width:"170px"}}>Age Group*</th>
                    <th style={{ width:"95px"}}>Gender*</th>
                    <th style={{ width:"110px"}}>
                        <Box display="flex">
                           <Box width="90%">Meet & Greet </Box>
                           <Box><IconInformation serviceName={"Meet & greet"} cost={process.env.NEXT_PUBLIC_MEET_GREET_5_TO_12_PRICE+","+process.env.NEXT_PUBLIC_MEET_GREET_12_TO_58_PRICE+","+process.env.NEXT_PUBLIC_MEET_GREET_ABOVE_58_PRICE} type={"none"}></IconInformation></Box>
                        </Box>
                     </th>
                    <th style={{ width:"100px"}}>
                    <Box display="flex">
                           <Box width="99%">Wheel Chair </Box>
                           <Box><IconInformation serviceName={"Wheel Chair"} type={"wheel"} cost={process.env.NEXT_PUBLIC_WHEEL_CHAIR_PRICE}></IconInformation></Box>
                        </Box>
                    </th>

                    <th style={{ width:"90px"}}>
                      <Box display="flex">
                             <Box width="99%">Golf Cart</Box>
                             <Box><IconInformation serviceName={"Golf Cart"} cost={process.env.NEXT_PUBLIC_GOLF_CART_5_TO_12_PRICE+","+process.env.NEXT_PUBLIC_GOLF_CART_12_TO_58_PRICE+","+process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_58_PRICE}  type={"none"}></IconInformation></Box>
                      </Box>
                     </th>
                    <th style={{ width:"90px"}}>Remove</th>
                  </tr>
                </thead>
              <tbody>
               {showPassengerDetail()}
              </tbody>
              </table>
          </div>
          <div className="add-pass-container">
            <Button className="add-pass"  variant="contained" onClick={() => addPassenger()}>
              ADD PASSENGER
            </Button>
          </div>
         </>
 };
export default PassengerDetails;
