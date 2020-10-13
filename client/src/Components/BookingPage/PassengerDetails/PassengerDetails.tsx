import React from "react";
import "../main.css";

const PassengerDetails=()=>{

    return(
        <React.Fragment>
        {/* passenger's contact information */}
        <span>Passenger's Details</span>
        <table width="100%" >
            <tr>
                <th>Seat No.</th>
                <th>Passenger Name</th>
                <th>Age Group</th>
                <th>Gender</th>
                <th>    Meet & Greet *<br/>
                            (500 Per Person)

                </th>
                <th>Wheel Chair<br/>
                    (80 Per Person)
                </th>
                <th>Golf Cart<br/>
                    (80 Per Person)
                </th>


            </tr>
            <tr>
                <td>B7LB36</td>
                <td><input value={"Ram Sahara Anand"}/></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>B7MB37</td>
                <td><input value={"Darshana"}/></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>B7LB36</td>
                <td><input value={"Amit Arora"}/></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>B7LB36</td>
                <td><input value={"Vanshaj Arora"}/></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>


        </table>
    </React.Fragment>
    );
}
export default PassengerDetails;