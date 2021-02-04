import React from 'react';
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {Typography,Tooltip, Avatar} from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  
    purple: {
      height:"20px",
      width:"20px",
      color: theme.palette.getContrastText(deepPurple[900]),
      backgroundColor: deepPurple[50],
    },
  }));
  
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#000066',
      color:"white",
      maxWidth: 320,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);


  const whatToShow = (service, cost, type) =>{
      switch(type) {
          case "luggage":
                var a = cost.split(",");
                return <React.Fragment>
                         <Typography color="inherit">Pricing of {service}</Typography>
                          <p>Luggage weight</p>
                          <em> betweem 1 to 7 kg  =   </em> <b>₹{a[0]}/-</b><br></br>
                          <em> between 7 to 20 kg =  </em> <b>₹{a[1]}/-</b><br></br>
                          <em> between 20 to 30 kg =  </em> <b>₹{a[2]}/-</b><br></br>
                        </React.Fragment>
          case "wheel":
            return <React.Fragment>
                     <Typography color="inherit">Pricing of {service}</Typography>
                     <p> Cost for golf cart = <b>₹{cost}/-</b></p> 
                    </React.Fragment>
          default:
            var a = cost.split(",");
            return <React.Fragment>
                     <Typography color="inherit">Pricing of {service}</Typography>
                      <p>Age lies in range</p>
                      <em> 5 to 12  =  </em> <b>₹{a[0]}/-</b><br></br>
                      <em> 12 to 58 = </em> <b>₹{a[1]}/-</b><br></br>
                      <em> above 58  = </em> <b>₹{a[2]}/-</b><br></br>
                    </React.Fragment>
      }

  }


export const IconInformation = ({serviceName, cost, type}) =>{
    console.log(cost)
    const classes=useStyles();
    return <>
        <HtmlTooltip title={cost ?whatToShow(serviceName, cost, type):""} >
            <Avatar className={classes.purple} sizes="small"><i style={{color:"#000066"}}>i</i></Avatar>
        </HtmlTooltip>

    </>

}

