import useWindowSize from '../../helpers/windowDimension';
import {Grid,FormControlLabel,Box,Button,TextField,List,Avatar,ListItemText,ListItemAvatar,ListItem,CardContent,Typography,Divider} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import useStyles from './style';
import MuiAlert from '@material-ui/lab/Alert';
import { useEffect, useState } from 'react';
import { coupounData } from './coupuns';
import { set } from 'js-cookie';

const Checkout = ({ data, order,originalOrder, terms, isAgreed,handleChange,register,code, invalidCoupun, submitCoupon }) => {
  const classes = useStyles();
  const { width } = useWindowSize();
  const [is_applied, setApplied]=useState(false);
  console.log(code, "code")
  function Alert(props) {
    return <MuiAlert  variant="filled" {...props} />;
  }
  useEffect(()=>{
  }, [invalidCoupun, is_applied, code])

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

                      <Box p={1} width="63%">
                      <TextField  size="small"
                        variant="outlined"
                        placeholder="Coupon code"
                        name={`coupon`}
                        onChange={(e)=> {handleChange(e); setApplied(false)} }
                        inputProps={{
                          maxLength: 5,
                          style:{
                            height:"10px"
                          }
                        }}
                        inputRef={register({maxLength:5, minLength:5})}
                        value={code}

                        fullWidth
                      />

                      {invalidCoupun && <span style={{paddingLeft:"10px","color":"red"}}>Invalid</span>}
                      {!invalidCoupun && code!=null && code!="" && is_applied && <span style={{paddingLeft:"10px","color":"#00c4fe"}}>Applied Successfully</span>}

                      </Box>
                      <Box p={1} width="50%">
                      <Button  variant="outlined" id="users-cancel-booking-design"  onClick={() => {submitCoupon(code); setApplied(true)}}>
                           Apply Coupon
                      </Button>
                      </Box>
                  </Box>

                  {/* <Divider variant="middle"/>
                      <Box display="flex" p={0} bgcolor="background.paper">

                          <Box p={1} width="100%">
                            Final Cost
                          </Box>
                          <Box p={1} flexShrink={0}>
                            ₹{(originalOrder?originalOrder.total_amount-data.total_amount:data.total_amount)}
                          </Box>
                      </Box> */}
                {width>500 && (
                  <div className="text-center pt-3 pb-3">
                   <Button  size="large" className="o-booknow-btn" variant="contained" onClick={()=>{terms ? order() : isAgreed(false)}}>
                      Book Now
                   </Button>
                  </div>
              )}
          </Paper>
         </div>
}

export default Checkout;
