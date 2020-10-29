import BaggageGurantee from "./baggageGurantee";
import { Field } from "formik";

const PorterService = (props) => {
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
              <Field

                name="LargeBags"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.largeBags}
              />
                {props.errors.LargeBags && (
                                <div className="errors">{props.errors.LargeBags}</div>
                            ) }
            </td>
            <td>
              <Field

                name="MediumBags"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.mediumBags}
              />
                {props.errors.MediumBags && (
                                <div className="errors">{props.errors.MediumBags}</div>
                            )}

            </td>
            <td>
              <Field

                name="SmallBags"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.smallBags}
              />
                {props.errors.SmallBags && (
                                <div className="errors">{props.errors.SmallBags}</div>
                            )}

            </td>
            <td style={{ width: "20%" }}>&#x20b9;300</td>
          </tr>
        </tbody>
      </table>
      <BaggageGurantee />
    </div>
  );
};
export default PorterService;
