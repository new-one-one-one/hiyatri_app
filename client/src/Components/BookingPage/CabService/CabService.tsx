import React from "react";
import "../main.css";

interface IcabService {
    handleChange: any;
    handleBlur: any;
    errors: any;
    values: any;
    touched: any;
    disabled: any
}

const CabService = (props: IcabService) => {


    return (

        <React.Fragment>
            {/* passenger's contact information */}

            <table width="100%" >
                <tr>
                    <th>Destination</th>
                    <th>No. of Passengers</th>
                    <th>Luggage Bags</th>
                    <th>No. Of Cabs</th>
                    <th>Price</th>

                </tr>
                <tr>
                    <td>
                        <input disabled={!props.disabled} name="destination" value={props.values.destination} type="Text" onBlur={props.handleBlur} onChange={props.handleChange} />
                        <span className="errors">{props.errors.destination && props.touched.destination && props.errors.destination}</span>
                    </td>
                    <td><input disabled={!props.disabled} value={"4"} /></td>
                    <td><input disabled={!props.disabled} value={"2"} /></td>
                    <td><input disabled={!props.disabled} value={"2"} /></td>
                    <td><input disabled={!props.disabled} value={"2200"} /></td>
                </tr>
            </table>
        </React.Fragment>


    );
}

export default CabService;