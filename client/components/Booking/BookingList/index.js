import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Typography,ButtonGroup, CardContent,Button,Grid, CardActions,Box, Divider} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginTop:"100px",
        marginLeft:"10%",
        marginRight:"10%",
        minWidth: 300,
    },
    particularBooking:{
        marginBottom:"5%",
        // textAlign:"center",
        minWidth:"300px"
    },
    details:{
        position:"center",
        paddingLeft:"15%",
        paddingRight:"15%",
    }
  });

const ShowAllBookings = (data) =>{
    const myStatus= (status) =>{
        switch (status){
            case "ASSIGN_TO_ADMIN": return (
                                            <ButtonGroup fullWidth variant="contained">
                                                <Button color="primary">Modify</Button>
                                                <Button color="secondary">Cancel</Button>
                                            </ButtonGroup>
                                )
            case "COMPLETED": return (
                        <ButtonGroup fullWidth variant="contained">
                             <Button color="primary">Completed</Button>
                        </ButtonGroup>
            )
            case 'IN_PROGRESS':return (
                    <div>
                        <Button color="secondary" disabled={true}>In progress</Button>
                    </div>
            )
         }
    }

    const display= (bookings)=>{
        if(bookings!==undefined && bookings){
        return bookings.data.response.map((allInfo)=>{
            const booking = allInfo.booking;
            const {boarding_station, reservation_upto,is_arrival} = booking.booking_information;
           return (
               <Grid item>
                <Card className={classes.particularBooking}>
                    <CardContent>
                    <Typography  variant="body1">
                                {booking.booking_id} <b>({allInfo.order_type})</b>
                            </Typography>
                            <Divider variant="fullWidth"/>
                            <Divider variant="fullWidth"/>
                            <Divider variant="fullWidth"/>
                            <br/>
                        <div className={classes.details}>
                            <Grid container xs={12} justify="space-between" alignItems="center">
                                <Typography  variant="body2"  align="left">Date :</Typography>
                                <Typography  variant="body2" align="right">{boarding_station.date}</Typography>
                            </Grid>
                            <Grid container xs={12} justify="space-between">
                                <Typography  variant="body2"  align="left">Time : </Typography>
                                <Typography  variant="body2" align="right">{boarding_station.time}</Typography>
                            </Grid>
                            <Grid container xs={12} justify="space-between">
                                <Typography  variant="body2"  align="left">PNR Number :</Typography>
                                <Typography  variant="body2" align="right">{booking.pnr_number}</Typography>
                            </Grid>
                        </div>


                    </CardContent>
                    <CardActions>
                               {myStatus(allInfo.order_status)}
                    </CardActions>
                </Card>
            </Grid>
        )
    })
    }
    }
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container xs={12} spacing={4}>
                {display(data)}
            </Grid>

        </div>
    )
}

export default ShowAllBookings;
