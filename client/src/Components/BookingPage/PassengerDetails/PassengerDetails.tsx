import React from "react";
import "../main.css";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";


interface passengersProps {
  handleChange: any;
  handleBlur: any;
  values: any;
  errors: any;
  touched: any;
  otherServices1: any;
  otherServices2: any;
  otherServices3: any;
  otherServices4: any;
  toggler: any;
}

const PassengerDetails = (props: passengersProps) => {
  return (
    <div className="Passenger-Details">
      {/* passenger's contact information */}
      <table  >
        <thead>
          <tr>
            <th >Seat No.</th>
            <th >Passenger Name</th>
            <th  >Age Group</th>
            <th  >Gender</th>
            <th >

              Meet & Greet *<br />
            (500 Per Person)
          </th>
            <th >
              Wheel Chair
            <br />
            (80 Per Person)
          </th>
            <th >
              Golf Cart
            <br />
            (80 Per Person)
          </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td >B7LB36</td>
            <td>
              <input value={"Ram Sahara Anand"} />
            </td>
            <td >

              <select >
                <option value="option1">Sr Citizen (Above 60)</option>
                <option value="option2">Adult(12 yrs-60yrs)</option>
                <option value="option3">Kid(below 12)</option>
              </select>

            </td>
            <td >  <select >
              <option value="option1">Male</option>
              <option value="option2">Female</option>

            </select></td>
            <td>


              <Grid component="label" container alignItems="center" >
                <span >No</span>

                <Switch name="firstRow" onChange={props.toggler} />

                <span >Yes</span>
              </Grid>

            </td>
            <td>


              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices1} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>

            <td>

              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices1} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
          </tr>

          <tr>
            <td>B7MB37</td>
            <td>
              <input value={"Darshana"} />
            </td>
            <td>  <select >
                <option value="option1">Sr Citizen (Above 60)</option>
                <option value="option2">Adult(12 yrs-60yrs)</option>
                <option value="option3">Kid(below 12)</option>
              </select>
            
            </td>
            <td>

              <select >
                <option value="option1">Male</option>
                <option value="option2">Female</option>

              </select>
            </td>
            <td>

              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch onChange={props.toggler} name="secondRow" />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
            <td>


              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices2} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
            <td>


              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices2} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
          </tr>

          <tr>
            <td>B7LB36</td>
            <td>
              <input value={"Amit Arora"} />
            </td>
            <td>  <select >
                <option value="option1">Sr Citizen (Above 60)</option>
                <option value="option2">Adult(12 yrs-60yrs)</option>
                <option value="option3">Kid(below 12)</option>
              </select>
            
            </td>
            <td>
              <select >
                <option value="option1">Male</option>
                <option value="option2">Female</option>

              </select>
            </td>
            <td>

              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch onChange={props.toggler} name="thirdRow" />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
            <td>


              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices3} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
            <td>

              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices3} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
          </tr>

          <tr>
            <td>B7LB36</td>
            <td>
              <input value={"Vanshaj Arora"} />
            </td>
            <td>  <select >
                <option value="option1">Sr Citizen (Above 60)</option>
                <option value="option2">Adult(12 yrs-60yrs)</option>
                <option value="option3">Kid(below 12)</option>
              </select>
            </td>
            <td>
              <select >
                <option value="option1">Male</option>
                <option value="option2">Female</option>

              </select>
            </td>
            <td>

              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch onChange={props.toggler} name="fourthRow" />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
            <td>

              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices4} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
            <td>

              <Grid component="label" container alignItems="center" >
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices4} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>

            </td>
          </tr>
        </tbody>

      </table>
    </div>
  );
};
export default PassengerDetails;
