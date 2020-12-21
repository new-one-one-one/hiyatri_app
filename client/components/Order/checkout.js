import useWindowSize from '../../helpers/windowDimension';
import {Grid,FormControlLabel,Box,Button,TextField,List,Avatar,ListItemText,ListItemAvatar,ListItem,CardContent,Typography,Divider} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import useStyles from './style';
import MuiAlert from '@material-ui/lab/Alert';


const Checkout = ({ data, order,originalOrder, terms }) => {
  console.log(terms)
  const classes = useStyles();
  const { width } = useWindowSize();

  function Alert(props) {
    return <MuiAlert  variant="filled" {...props} />;
  }

  return <div className="shadow p-3">
            <Paper>
                  <Box display="flex" p={0} bgcolor="background.paper">
                      <Box p={1} width="100%">
                         Total
                      </Box>
                      <Box p={1} flexShrink={0}>
                         ₹{data && data.total_amount}
                      </Box>
                  </Box>
                  <Box display="flex" p={0} bgcolor="background.paper">
                      <Box p={1} width="100%">
                         Discount
                         <br />
                         <p style={{color:"blue"}}>
                           Apply Coupon ?
                         </p>
                      </Box>
                      <Box p={1} flexShrink={0}>

                      </Box>
                  </Box>
                  <Divider variant="middle"/>
                      <Box display="flex" p={0} bgcolor="background.paper">

                          <Box p={1} width="100%">
                            Final Cost
                          </Box>
                          <Box p={1} flexShrink={0}>
                            ₹{originalOrder?originalOrder.total_amount-data.total_amount:data.total_amount}
                          </Box>
                      </Box>
                {width>500 && (
                  <div className="text-center pt-3 pb-3">
                   <Button  size="large" className="o-booknow-btn" variant="contained" onClick={order} disabled={!terms}>
                    Book Now
                   </Button>
                  </div>
              )}
          </Paper>
         </div>
}

export default Checkout;
