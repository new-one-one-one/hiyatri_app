import React from "react";
import "../../BookingPage/main.css";
import BaggageGurantee from "./BaggageGurantee/BaggageGurantee";

interface Iprops {
  handleChange: any;
  handleBlur: any;
  values: any;
  errors: any;
  touched: any;
  disabled: Boolean;
}

const PorterService = (props: Iprops) => {
  return (
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
              <input
                type="number"
                name="largeBags"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.largeBags}
              />
              <span className="errors">
            
                {props.errors.largeBags &&
                  props.touched.largeBags &&
                  props.errors.largeBags}
              </span>
            </td>
            <td>
              <input
                type="number"
                name="mediumBags"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.mediumBags}
              />
              <span className="errors">
              
                {props.errors.mediumBags &&
                  props.touched.mediumBags &&
                  props.errors.mediumBags}
              </span>
            </td>
            <td>
              <input
                type="number"
                name="smallBags"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.smallBags}
              />
              <span className="errors">
           
                {props.errors.smallBags &&
                  props.touched.smallBags &&
                  props.errors.smallBags}
              </span>
            </td>
            <td style={{ width: "20%" }}>&#x20b9;300</td>
          </tr>
        </tbody>
      </table>
      <BaggageGurantee/>
    </div>
  );
};
export default PorterService;
