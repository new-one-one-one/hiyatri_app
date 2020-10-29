import { Field } from "formik";

const PassengerContactInfo = (props) => {
    return (
        <div className="contact-Information">
            <table>
                <thead>
                    <tr>
                        <th>Passenger Contact Number*</th>
                        <th>Secondary Mobile No.</th>
                        <th>Email ID</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <Field  className="input-fields"
                        name="PassengerNumber"
                        onChange={props.handleChange}
                        value={props.values.PassengerNumber}
                        onBlur={props.handleBlur}
                        type="Number" />
                        {props.errors.PassengerNumber && props.touched.PassengerNumber && (
                            <div className="errors">{props.errors.PassengerNumber}</div>
                        )}
                        </td>
                        <td>
                          <Field className="input-fields"
                          value={props.values.SecondaryMobile}
                          type="Number"
                          name="SecondaryMobile"
                          onChange={props.handleChange} />
                        </td>
                        <td>
                          <Field className="input-fields"
                          name="email"
                          value={props.values.email}
                          type="email"
                          onChange={props.handleChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PassengerContactInfo;
