import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from 'react';
import {TextField,FormHelperText} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import {Button,Box} from '@material-ui/core';
import { IconInformation } from "../../iconInformation";


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
                         variant="outlined"
                         autoComplete={false}
                         name={`passenger_detail_seat${index}`}
                         value={item.seat_number}
                         onChange={handleChange("passenger_detail_seat", index)}
                         inputRef={register({ required: true, minLength:2})}
                         error={passenger_detail_name ?true:false}
                         helperText={passenger_detail_name? "Passenger seat is required":""}
                         />

                        </td>
                        <td>
                         <TextField
                          variant="outlined"
                          autoComplete={false}
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
                        <td>
                        <Button type="button" id={data.passenger_details.length==1?"":"yes-btn"} style={{marginLeft:"20px"}} disabled={data.passenger_details.length==1?true:false} variant="contained" onClick={() => remove(index)}>
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
                    <th style={{ width:"85px"}}>Gender*</th>
                    <th style={{ width:"90px"}}>
                        <Box display="flex">
                           <Box width="80%">Meet & Greet </Box> 
                           <Box><IconInformation serviceName={"Meet & greet"} cost={process.env.NEXT_PUBLIC_MEET_GREET_5_TO_12_PRICE+","+process.env.NEXT_PUBLIC_MEET_GREET_12_TO_58_PRICE+","+process.env.NEXT_PUBLIC_MEET_GREET_ABOVE_58_PRICE} type={"none"}></IconInformation></Box>
                        </Box>
                         
                      
                     </th>
                    <th style={{ width:"90px"}}>

                    <Box display="flex">
                           <Box width="80%">Wheel Chair </Box> 
                           <Box><IconInformation serviceName={"Wheel Chair"} type={"wheel"} cost={process.env.NEXT_PUBLIC_WHEEL_CHAIR_PRICE}></IconInformation></Box>
                        </Box>

                    </th>
                    
                    <th style={{ width:"90px"}}>
                    <Box display="flex">
                           <Box width="80%">Golf Cart</Box> 
                           <Box><IconInformation serviceName={"Golf Cart"} cost={process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_5_TO_12_PRICE+","+process.env.NEXT_PUBLIC_GOLF_CART_12_TO_58_PRICE+","+process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_58_PRICE}  type={"luggage"}></IconInformation></Box>
                        </Box>

                     </th>
                    <th style={{ width:"90px"}}>Remove</th>
                  </tr>
                </thead>
              <tbody>
               {showPassengerDetail()}
              </tbody>
              </table>
              <div style={{marginLeft:"89%"}}>
                    <Button className="bd-btn-agent" type="button" style={{marginRight:"0px"}} variant="contained" onClick={() => addPassenger()}>
                      ADD PASSENGER
                    </Button>
              </div>
          </div>
         </>
 };
export default PassengerDetails;
