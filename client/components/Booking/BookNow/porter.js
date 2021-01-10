import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';


const PorterService = ({ handleChange, state }) => {

  return <>
          <div className="porter-service shadow">
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
                   value={state.porter_service_detail.large_bags.unit === 0?"":state.porter_service_detail.large_bags.unit}
                   onChange={handleChange("porter_service_lg_bags")} />
                </td>
                <td>
                  <OutlinedInput
                  type="number"
                   value={state.porter_service_detail.medium_bags.unit === 0?"":state.porter_service_detail.medium_bags.unit}
                   onChange={handleChange("porter_service_md_bags")} />
                </td>
                <td>
                  <OutlinedInput
                   type="number"
                   value={state.porter_service_detail.small_bags.unit === 0?"":state.porter_service_detail.small_bags.unit}
                   onChange={handleChange("porter_service_sm_bags")} />
                </td>

              </tr>
            </tbody>
          </table>
          <div className="baggage-container">
          <Checkbox
             className="baggage-input"
             checked={state.porter_service_detail.baggage_garanteed.baggage_garanteed_opted}
             onChange={handleChange("baggage_garanteed_opted")}
              name="checkedB"
              color="primary"
          />

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
