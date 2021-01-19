import { Grid,OutlinedInput,Checkbox,FormControlLabel,Box,Button,TextField,List,Avatar,ListItemText,ListItemAvatar,ListItem,CardContent,Typography,Divider,Paper,IconButton,AppBar,Toolbar,Menu,MenuItem, useMediaQuery} from "@material-ui/core";
import useStyles from './style';
import {useTheme} from '@material-ui/core/styles';

const Summary = ({ data }) => {
  const theme = useTheme();
    const classes = useStyles();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return <div className="shadow">
       <Paper  className={classes.orderFull}>
          <div className="pt-3" />
          <Box className={classes.headingPart1} p={2}>
            <Typography>
              Meeting Services
            </Typography>
          </Box>
          <Paper  className={classes.particularOrder}>
            {matches?
              (
              <div style={{paddingLeft:"30px"}}>
              <Grid container spacing={1}>
                <Grid container spacing={3}>
                <Grid  item  xs={4}>
                    Meeting Station:<br />
                    <b style={{color:'black'}}> {data.booking_information.is_arrival?data.booking_information.boarding_station.station_name:data.booking_information.reservation_upto.station_name} </b>
                </Grid>
                <Grid  item xs={4}>
                    Time Of {data.booking_information.is_arrival?"Arrival":"Departure"}<br />
                    <b style={{color:'black'}}>{data.booking_information.is_arrival?data.booking_information.boarding_station.time:data.booking_information.reservation_upto.time} </b>
                </Grid>
                <Grid  item xs={4}>
                    Number of passengers:<br />
                    <b style={{color:'black'}}>{data.passenger_details.length} </b>
                </Grid>
               </Grid>
           </Grid>
           </div>
           ):(
            <div style={{marginLeft:"10px"}}> 
              <Box display="flex">
                <Box width="50%"><b>Station</b></Box>
                <Box width="10%"><b>:</b></Box>
                <Box width="50%">{data.booking_information.is_arrival?data.booking_information.reservation_upto.station_name:
                        data.booking_information.boarding_station.station_name}</Box>
              </Box>
              <Box display="flex">
                  <Box width="50%"><b>Time</b></Box>
                  <Box width="10%"><b>:</b></Box>
                  <Box width="50%">{data.booking_information.is_arrival?data.booking_information.reservation_upto.time:
                     data.booking_information.boarding_station.time}</Box>
              </Box>
              <Box display="flex">
                  <Box width="50%"><b>Passengers</b></Box>
                  <Box width="10%"><b>:</b></Box>
                  <Box width="50%">{data.passenger_details.length}</Box>
              </Box>
            </div>
            )}
            
          </Paper>
         
          <Paper  className="p-3">
             {data.passenger_details.map((item, i) => {
               return <div className={classes.outerPass}>
                       <div className={classes.outerDetails}>
                       <Grid container xs={12} justify="space-between">
                       <Typography  variant="body1" align="left">
                         <b>{item.passenger_name}</b>
                       </Typography>
                       <Typography  variant="body1" align="right">
                           <b>₹{item.bill.total}</b>
                       </Typography>
                       </Grid>
                       </div>
                       <Divider/>
                       <div className={classes.innerDetails} >
                         <Grid container xs={12} justify="space-between" className="p-1">
                             <Typography  variant="body2"  align="left">
                                {item.meet_and_greet?"Meet & Greet":""}
                             </Typography>
                             <Typography  variant="body2" align="right">
                              {item.meet_and_greet?`₹${item.bill.meet_and_greet}`:""}
                             </Typography>
                         </Grid>
                         <Grid container xs={12} justify="space-between" className="p-1">
                             <Typography  variant="body2"  align="left">
                                {item.wheel_chair?"Wheel Chair":""}
                             </Typography>
                             <Typography  variant="body2" align="right">
                               {item.wheel_chair?`₹${item.bill.wheel_chair}`:""}
                             </Typography>
                         </Grid>
                         <Grid container xs={12} justify="space-between" className="p-1">
                             <Typography  variant="body2"  align="left">
                                {item.golf_cart?"Golf cart":""}
                             </Typography>
                             <Typography  variant="body2" align="right">
                              {item.golf_cart?`₹${item.bill.golf_cart}`:""}
                             </Typography>
                         </Grid>
                       </div>
                      </div>
           })}
          </Paper>
     </Paper>
        </div>
}

export default Summary;
