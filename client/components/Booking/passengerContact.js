
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
              <input className="input-fields"
               value={data.passenger_contact_information.name}
               onChange={handleChange("passenger_name")}
               type="text" />
            </td>
            <td>
              <input className="input-fields"
               value={data.passenger_contact_information.passenger_primary_number}
               onChange={handleChange("passenger_primary_number")}
               type="number" />
            </td>
            <td>
              <input className="input-fields"
               value={data.passenger_contact_information.passenger_secondary_number}
               onChange={handleChange("passenger_secondary_number")}
               type="number" />
            </td>
            <td>
              <input className="input-fields"
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
