import {TextField} from '@material-ui/core';

const PassengerContactInformation = ({ handleChange, data, register, errors }) => {
return <>
  <div className="contact-Information">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Passenger Mobile Number*</th>
            <th>Secondary Mobile No.</th>
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
              onChange={handleChange("passenger_name")}
              inputRef={register({required: true, minLength:2})}
              error={errors.passenger_name ?true:false}
              helperText={errors.passenger_name? "Passenger name is required":""}
              fullWidth
            />
            </td>
            <td>
              <TextField
               variant="outlined"
               name="passenger_primary_number"
               value={data.passenger_contact_information.primary_contact_number}
               onChange={handleChange("passenger_primary_number")}
               inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})}
               error={errors.passenger_primary_number ?true:false}
               helperText={errors.passenger_primary_number? "Primary contact number is required":""}
               fullWidth
               type="Number" />
            </td>
            <td>
              <TextField
               fullWidth
               variant="outlined"
               value={data.passenger_contact_information.passenger_secondary_number}
               onChange={handleChange("passenger_secondary_number")}
               type="number" />
            </td>
            <td>
              <TextField
               fullWidth
               variant="outlined"
               value={data.passenger_contact_information.passenger_email}
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
