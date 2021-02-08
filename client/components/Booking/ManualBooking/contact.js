import {TextField,InputAdornment} from '@material-ui/core';

const PassengerContactInformation = ({ handleChange, data, register, errors }) => {
return <>
  <div className="contact-Information shadow">
      <table>
        <thead>
          <tr>
            <th>Name*</th>
            <th>Primary Mobile Number*</th>
            <th>Back up Mobile No.</th>
            <th>Email ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>

            <TextField
              variant="outlined"
              type="text"
              name="passenger_name"
              id="input-fixed-height"
              value={data.passenger_contact_information.name}
              onChange={handleChange("passenger_name")}
              inputRef={register({required: true, minLength:2})}
              error={errors.passenger_name ?true:false}
              helperText={errors.passenger_name? "required":""}
              fullWidth
            />
            </td>
            <td>
              <TextField
               id="input-fixed-height"
               variant="outlined"
               disabled={true}
               name="passenger_primary_number"
               value={data.passenger_contact_information.primary_contact_number}
               InputProps={{startAdornment: <InputAdornment position="start">+91</InputAdornment>}}
               onChange={handleChange("passenger_primary_number")}
               inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})}
               error={errors.passenger_primary_number ?true:false}
               helperText={errors.passenger_primary_number? "required":""}
               fullWidth
               type="Number" />
            </td>
            <td>
              <TextField
               id="input-fixed-height"
               fullWidth
               variant="outlined"
               value={data.passenger_contact_information.secondary_contact_number}
               onChange={handleChange("passenger_secondary_number")}
               type="number" />
            </td>
            <td>
              <TextField
               id="input-fixed-height"
               fullWidth
               variant="outlined"
               value={data.passenger_contact_information.email_id}
               onChange={handleChange("passenger_email")}
               type="email" />
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</>
}

export default PassengerContactInformation;
