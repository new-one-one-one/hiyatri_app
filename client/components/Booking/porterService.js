import OutlinedInput from '@material-ui/core/OutlinedInput';


const PorterService = ({ handleChange }) => {
  return <>
          <div className="porter-Service">
          <table>
            <thead>
                <tr>
                  <th>No. of Large Bags</th>
                  <th>No. of Medium Bags</th>
                  <th>No. of Small Bags</th>
                  <th>Price</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <OutlinedInput
                  type="number"
                   onChange={handleChange("porter_service_lg_bags")} />
                </td>
                <td>
                  <OutlinedInput
                  type="number"
                   onChange={handleChange("porter_service_md_bags")} />
                </td>
                <td>
                  <OutlinedInput
                   type="number"
                   onChange={handleChange("porter_service_sm_bags")} />
                </td>
                <td style={{ width: "20%" }}>
                 &#x20b9;300
                </td>
              </tr>
            </tbody>
          </table>
          <div className="baggage-container">
            <input  className="baggage-input" type="checkbox"/>
              <span className="baggage-text">
                Baggage Gurantee
              </span>
              <span>
                Starting &#x20b9;20 Per Bag*
              </span>
            </div>
          </div>
   </>
};
export default PorterService;
