import OutlinedInput from '@material-ui/core/OutlinedInput';



const PassengerContactInformation = ({ handleChange, data }) => {

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

            <OutlinedInput
              variant="outlined"
              type="text"
              value={data.passenger_contact_information.name}
              onChange={handleChange("passenger_name")}
              fullWidth
            />
            </td>
            <td>
              <OutlinedInput
               value={data.passenger_contact_information.primary_contact_number}
               onChange={handleChange("passenger_primary_number")}
               fullWidth
               type="number" />
            </td>
            <td>
              <OutlinedInput
               fullWidth
               value={data.passenger_contact_information.passenger_secondary_number}
               onChange={handleChange("passenger_secondary_number")}
               type="number" />
            </td>
            <td>
              <OutlinedInput
               fullWidth
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
