import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Button,
  PopoverCloseButton,
} from "@chakra-ui/react"
import InfoIcon from '@material-ui/icons/Info';
import { useForm } from 'react-hook-form';
import { IconInformation } from "../../iconInformation";
import {TextField} from '@material-ui/core';




const PorterService = ({ handleChange, state }) => {
  const {register, errors, handleSubmit} = useForm();


const onHover = () => {
  return <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
          </PopoverContent>
        </Popover>
}

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
                   value={state.porter_service_detail.medium_bags.unit === 0?"":state.porter_service_detail.medium_bags.unit}
                   onChange={handleChange("porter_service_md_bags")} />
                </td>
                <td>
                  <TextField
                   id="input-fixed-height"
                   inputRef={register({pattern: /^\d+$/,required: true})}
                   type="number"
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
               <IconInformation serviceName={"Golf Cart"} cost={process.env.NEXT_PUBLIC_GOLF_CART_5_TO_12_PRICE+","+process.env.NEXT_PUBLIC_GOLF_CART_12_TO_58_PRICE+","+process.env.NEXT_PUBLIC_GOLF_CART_ABOVE_58_PRICE}  type={"luggage"}></IconInformation>
              <span>
              </span>
            </div>
          </div>
   </>
};
export default PorterService;
