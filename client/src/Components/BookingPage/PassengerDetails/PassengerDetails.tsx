import React from "react";
import "../main.css";
import Switch from "@material-ui/core/Switch";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface passengersProps {

    handleChange: Function;
    handleBlur: Function;
    values: any;
    errors: any;
    touched: any;
    otherServices1:any;
    otherServices2:any;
    otherServices3:any;
    otherServices4:any;
    toggler:any;
}


const PassengerDetails = (props: passengersProps) => {

    return (
        <React.Fragment>
            {/* passenger's contact information */}
            <span>Passenger's Details</span>
            <table width="100%" >
                <tr>
                    <th>Seat No.</th>
                    <th>Passenger Name</th>
                    <th>Age Group</th>
                    <th>Gender</th>
                    <th>    Meet & Greet *<br />
                            (500 Per Person)

                </th>
                    <th>Wheel Chair<br />
                    (80 Per Person)
                </th>
                    <th>Golf Cart<br />
                    (80 Per Person)
                </th>


                </tr>
                <tr>
                    <td>B7LB36</td>
                    <td><input  value={"Ram Sahara Anand"} /></td>
                    <td></td>
                    <td></td>
                    <td> <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch name="firstRow" onChange={props.toggler} />
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography>

                    </td>
                    <td> <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices1} />
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>

                    <td><Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices1} />
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                </tr>

                <tr>
                    <td>B7MB37</td>
                    <td><input value={"Darshana"} /></td>
                    <td></td>
                    <td></td>
                    <td>

                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>No</Grid>
                                <Grid item>
                                    <Switch onChange={props.toggler} name="secondRow"/>
                                </Grid>
                                <Grid item>Yes</Grid>
                            </Grid>
                        </Typography>
                    </td>
                    <td> <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices2}/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                    <td> <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices2}/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                </tr>

                <tr>
                    <td>B7LB36</td>
                    <td><input value={"Amit Arora"} /></td>
                    <td></td>
                    <td></td>
                    <td><Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch onChange={props.toggler} name="thirdRow"/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                    <td> <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices3}/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                    <td><Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices3}/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                </tr>

                <tr>
                    <td>B7LB36</td>
                    <td><input value={"Vanshaj Arora"} /></td>
                    <td></td>
                    <td></td>
                    <td><Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch onChange={props.toggler} name="fourthRow"/>
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                    <td><Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices4} />
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                    <td><Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>No</Grid>
                            <Grid item>
                                <Switch disabled={props.otherServices4} />
                            </Grid>
                            <Grid item>Yes</Grid>
                        </Grid>
                    </Typography></td>
                </tr>


            </table>
        </React.Fragment>
    );
}
export default PassengerDetails;