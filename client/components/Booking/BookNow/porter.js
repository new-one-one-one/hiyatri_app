import OutlinedInput from '@material-ui/core/OutlinedInput';


const PorterService = ({ handleChange }) => {
  return <>
          <div className="porter-Service">
          <table>
            <thead>
                <tr>
                  <th>No. of Large Bags(20kg-30kg)</th>
                  <th>No. of Medium Bags(7kg-20kg)</th>
                  <th>No. of Small Bags(Below 7KG)</th>

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
                 
              </tr>
            </tbody>
          </table>
          <div className="baggage-container">
            <input  className="baggage-input" type="checkbox"/>
              <span className="baggage-text">
                Baggage Gurantee
              </span>
              <span>
              </span>
            </div>
          </div>
   </>
};
export default PorterService;
