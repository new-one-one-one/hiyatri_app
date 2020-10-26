import React from "react";
import "../main.css";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
<<<<<<< HEAD


=======
import Typography from "@material-ui/core/Typography";

>>>>>>> origin/booking
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
<<<<<<< HEAD
      <table  >
        <thead>
        <tr>
          <th >Seat No.</th>
          <th >Passenger Name</th>
          <th  >Age Group</th>
          <th  >Gender</th>
          <th >
=======
      <table width="100%">
        <thead>
        <tr>
          <th>Seat No.</th>
          <th>Passenger Name</th>
          <th  style={{width:"12%"}}>Age Group</th>
          <th style={{width:"12%"}}>Gender</th>
          <th>
>>>>>>> origin/booking
           
            Meet & Greet *<br />
            (500 Per Person)
          </th>
<<<<<<< HEAD
          <th >
=======
          <th>
>>>>>>> origin/booking
            Wheel Chair
            <br />
            (80 Per Person)
          </th>
<<<<<<< HEAD
          <th >
=======
          <th>
>>>>>>> origin/booking
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
         
              <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select>
        
          </td>
          <td >  <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select></td>
          <td>
           
<<<<<<< HEAD
        
              <Grid component="label" container alignItems="center" >
                <span >No</span>
                
                  <Switch name="firstRow" onChange={props.toggler} />
                
                <span >Yes</span>
              </Grid>
        
          </td>
          <td>
        
           
              <Grid component="label" container alignItems="center" >
=======
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>No</Grid>
                <Grid item>
                  <Switch name="firstRow" onChange={props.toggler} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
            </Typography>
          </td>
          <td>
        
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices1} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
          </td>

          <td>
           
              <Grid component="label" container alignItems="center" >
=======
            </Typography>
          </td>

          <td>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices1} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
=======
            </Typography>
>>>>>>> origin/booking
          </td>
        </tr>

        <tr>
          <td>B7MB37</td>
          <td>
            <input value={"Darshana"} />
          </td>
          <td>  <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select></td>
          <td>

          <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select>
          </td>
          <td>
<<<<<<< HEAD
           
              <Grid component="label" container alignItems="center" >
=======
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch onChange={props.toggler} name="secondRow" />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
          </td>
          <td>
           
           
              <Grid component="label" container alignItems="center" >
=======
            </Typography>
          </td>
          <td>
           
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices2} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
          </td>
          <td>
           
           
              <Grid component="label" container alignItems="center" >
=======
            </Typography>
          </td>
          <td>
           
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices2} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
=======
            </Typography>
>>>>>>> origin/booking
          </td>
        </tr>

        <tr>
          <td>B7LB36</td>
          <td>
            <input value={"Amit Arora"} />
          </td>
          <td>  <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select></td>
          <td>
          <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select>
          </td>
          <td>
<<<<<<< HEAD
           
              <Grid component="label" container alignItems="center" >
=======
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch onChange={props.toggler} name="thirdRow" />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
          </td>
          <td>
           
           
              <Grid component="label" container alignItems="center" >
=======
            </Typography>
          </td>
          <td>
           
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices3} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
          </td>
          <td>
           
              <Grid component="label" container alignItems="center" >
=======
            </Typography>
          </td>
          <td>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices3} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
=======
            </Typography>
>>>>>>> origin/booking
          </td>
        </tr>

        <tr>
          <td>B7LB36</td>
          <td>
            <input value={"Vanshaj Arora"} />
          </td>
          <td>  <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select></td>
          <td>
          <select name="platform" id="platform">
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="lochness">option3</option>
              </select>
          </td>
          <td>
<<<<<<< HEAD
           
              <Grid component="label" container alignItems="center" >
=======
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch onChange={props.toggler} name="fourthRow" />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
          </td>
          <td>
           
              <Grid component="label" container alignItems="center" >
=======
            </Typography>
          </td>
          <td>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices4} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
          </td>
          <td>
           
              <Grid component="label" container alignItems="center" >
=======
            </Typography>
          </td>
          <td>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
>>>>>>> origin/booking
                <Grid item>No</Grid>
                <Grid item>
                  <Switch disabled={props.otherServices4} />
                </Grid>
                <Grid item>Yes</Grid>
              </Grid>
<<<<<<< HEAD
           
=======
            </Typography>
>>>>>>> origin/booking
          </td>
        </tr>
      </tbody>
       
      </table>
    </div>
  );
};
export default PassengerDetails;
