import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import { IconInformation } from "../../iconInformation";
import { useForm } from 'react-hook-form';
import {TextField} from '@material-ui/core';


const PorterService = ({ handleChange, state }) => {
  const {register, errors, handleSubmit} = useForm();

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
                  <TextField
                      id="input-fixed-height"
                      inputRef={register({pattern: /^\d+$/,required: true})}
                      type="number"
                      name="porter_service_lg_bags"
                      onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                      variant="outlined"
                      value={state.porter_service_detail.large_bags.unit === 0?"":state.porter_service_detail.large_bags.unit}
                      onChange={handleChange("porter_service_lg_bags")} />
                </td>
                <td>
                  <TextField
                  id="input-fixed-height"
                   inputRef={register({pattern: /^\d+$/,required: true})}
                   type="number"
                   onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                   variant="outlined"
                   name="porter_service_md_bags"
                   value={state.porter_service_detail.medium_bags.unit === 0?"":state.porter_service_detail.medium_bags.unit}
                   onChange={handleChange("porter_service_md_bags")} />
                </td>
                <td>
                  <TextField
                   id="input-fixed-height"
                   inputRef={register({pattern: /^\d+$/,required: true})}
                   type="number"
                   name="porter_service_sm_bags"
                   onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                   variant="outlined"
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
                Baggage Guarantee
              </span>
               <IconInformation serviceName={"Buggage Gauranteed"} cost={process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_BELOW_7KG_PRICE+","+process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_7KG_TO_20KG_PRICE+","+process.env.NEXT_PUBLIC_LUGGAGE_GAURANTEE_20KG_TO_30KG_PRICE}  type={"Buggage Gauranteed"}></IconInformation>
              <span>
              </span>
            </div>
          </div>
   </>
};
export default PorterService;
