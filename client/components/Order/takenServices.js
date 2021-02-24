import {Grid,FormControlLabel,Box,Button,TextField,ListItemSecondaryAction,List,Avatar,ListItemText,ListItemAvatar,ListItem,CardContent,Typography,Divider} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import useStyles from './style';

const TakenServices = ({data}) => {
  const toShow = data.porter_service_detail.porter_service_opted || data.cab_service_detail.cab_service_opted!==null;
  const classes = useStyles();
  const porter_total =  data.porter_service_detail.large_bags.total +data.porter_service_detail.medium_bags.total+data.porter_service_detail.small_bags.total
  return <>

         {(toShow && porter_total!=0) && (
            <div className="shadow">

                <Paper className={classes.Services}>

                   <div style={{marginTop:"-10px"}}>
                    <Box className={classes.headingPart} p={1} bgcolor="#2a306c">
                            <Typography style={{color:"white"}}>Other Services</Typography>
                        </Box>
                   </div>

                    <div style={{marginRight:"10px", marginLeft:"10px"}}>
                    <List>
                       {(data.porter_service_detail.porter_service_opted )
                        && (<ListItem>
                            <ListItemText>
                               Porter Service
                            </ListItemText>
                            <ListItemSecondaryAction>
                            ₹{porter_total}
                            </ListItemSecondaryAction>
                        </ListItem>

                        )}


                       {( data.porter_service_detail.baggage_garanteed.baggage_garanteed_opted && porter_total!=0)&&(
                        <ListItem>
                            <ListItemText>
                                Baggage Gaurantee
                            </ListItemText>
                            <ListItemSecondaryAction>
                                ₹{
                                data.porter_service_detail.baggage_garanteed.large_bags.total +
                                data.porter_service_detail.baggage_garanteed.medium_bags.total+
                                data.porter_service_detail.baggage_garanteed.small_bags.total
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                       )}
                    {(data.cab_service_detail.cab_service_opted!==null)&&(
                        <ListItem>
                        <ListItemText>
                           Cab Service
                        </ListItemText>
                        <ListItemSecondaryAction>
                             {data.cab_service_detail.total_amount}
                        </ListItemSecondaryAction>
                    </ListItem>

                    )}

                    </List>
                    </div>
                </Paper>

            </div>
         )}
        </>
}

export default TakenServices;
