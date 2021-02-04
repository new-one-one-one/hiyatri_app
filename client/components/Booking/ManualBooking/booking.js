import { useEffect, useState } from "react";
import { getCookie, isAuth, setLocalStorage } from "../../../actions/auth";
import {TextField} from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { Select } from "@material-ui/core";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// pick a date util library
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';

const BookingInformation = ({query, handleChange, register, errors, state, changeDate}) => {

  const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}  

  
  const isArrival = query.pid==="arrival"?true:false;  
    var date = isArrival ? state.booking_information.reservation_upto.date : state.booking_information.boarding_station.date 
    if(date!==""){
      var month= parseInt(date.substring(3,5))
      month= String(month).length==1 ? "0"+month : month
      date = month+"-"+date.substring(0,2)+date.substring(5,)
    }
  
  const [selectedDate, handleDateChange] = useState(date!=""? new Date(date):new Date() );
  const changeVal =(value) =>{
    handleDateChange(value);
    changeDate(value);
  }
 
 console.log(selectedDate, "selected date")
  return (
    <div className="booking-Information shadow">
      {/* <DatePicker minDate={today}></DatePicker> */}
      <table>
        <thead>
          <tr>
            <th>Train No.*</th>
            <th>Train Name</th>
            <th>{capitalize(query.pid)} Station*</th>
            <th>{capitalize(query.pid)} Date*</th>
            <th>{capitalize(query.pid)} Time*</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <TextField
                variant="outlined"
                name="train_no"
                placeholder="train number"
                onChange={handleChange("train_no")}
                inputRef={register({ required: true, minLength:5})}
                error={errors.train_no?true:false}
                helperText={errors.train_no? "Train number is invalid !":""}
                value={state.train_no}
              />
            </td>
             <td>
             <TextField
                variant="outlined"
                name="train_name"
              />  
             </td>
             <td>
             <Select
                variant="outlined"
                name="station_name"
                className="pl-1"
                fullWidth
                native
                inputRef={register({ required: true })}
                onChange={handleChange("station_name",isArrival)}  
                value = {isArrival?state.booking_information.reservation_upto.station_name:state.booking_information.boarding_station.station_name}   
              >
                <option aria-label="None"  />
                <option value="New Delhi railway Station">New Delhi railway Station</option>
                <option value="Old Delhi railway Station">Old Delhi railway Station</option>
              </Select>
              {errors.station_name && <FormHelperText   style={{color:"red"}}>Please select {query.pid} station!</FormHelperText>}
              

             </td>
             <td>
             {/* <TextField
                  fullWidth
                    variant="outlined"
                    id="date"
                    label="Departure Date"
                    type="date"
                    name="date" 
                    inputRef={register({required:true})} 
                    
                    defaultValue={date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()}
                    InputLabelProps={{shrink: true}}
                    onChange={handleChange("date",isArrival)}
                    error={errors.date?true:false}
                helperText={errors.date? `Please provide ${query.pid} date `:""}
                /> */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker 
                        inputVariant="outlined"
                        value={ selectedDate }
                        name="date"
                        inputRef={register({required:true})} 
                        minDate={Date.now()}
                        onChange={(value) => {changeVal(value)}}
                        formatDate={(date) => moment(new Date()).format('DD-MM-YYYY')}  
                        />
                  </MuiPickersUtilsProvider>

             </td>
             <td>
             <TextField 
                fullWidth
                label="Departure Time"
                type="time"
                name="time" 
                inputRef={register({required:true})} 
                variant="outlined"
                defaultValue=""
                InputLabelProps={{shrink: true}}
                inputProps={{step: 300}}
                onChange={handleChange("time", isArrival)}
                error={errors.time?true:false}
                helperText={errors.time? `Please provide ${query.pid} time `:""}
                value ={isArrival?state.booking_information.reservation_upto.time:state.booking_information.boarding_station.time}   
                />
             </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingInformation;
