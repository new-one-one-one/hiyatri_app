import { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Modal from './otp_modal';
import {TextField, Typography,CardMedia, Box,CardContent, Card, Grid, CardHeader, Paper, Divider} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import {makeStyles} from '@material-ui/styles';
import {useForm} from 'react-hook-form';
import MaximizeIcon from '@material-ui/icons/Maximize';
import {FlightLand,FlightTakeoff} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  facilities:{
      paddingLeft:"10%",
      paddingRight:"10%",
      paddingBottom:"5%"
  },
  meetGreet:{
   paddingTop:"300px",
   paddingLeft:"10%",
      paddingBottom:"1%"
  },
  indiasOnly:{
   width:"708px",
   height:"370px"
  },
  eachBox:{
      width:"430px",
      height:"270px"
  }

}));



const Homepage = () => {
  const classes=useStyles();
  const [is_arrival, setJourney] = React.useState("arrival");
  const {register, errors,handleSubmit} = useForm()
  const [send_data, allowSending] = React.useState(false);
  const initialData = {
   status:"arrival",
   phone_number:"",
   pnr_number:"",     
}
  const [state, setState] = React.useState(initialData);
  const handleChange  = (data) => {
        data.status = is_arrival 
        setState(data);
        allowSending(true);
  }

  return <>
            {<div className="hp-curve" />}
            <div className="hp-welcome">
               <div className="mb-hp-welcome d-sm-block d-md-none">
                  <img src="/images/home_welcome_mobile.jpg" width="100%" />
               </div>
               <div className="hp-welcome-inner">
                  <div className="row justify-content-center">
                     <div className="col-md-5 hp-inp-outer">              

                     
                        <div className="hp-inp-container">
                           <div className="hp-radio-btn">
                               <FormControl component="fieldset">
                               <RadioGroup   name="journeyType" value={is_arrival==="arrival"?"Arrival":"Departure"}>
                                <div style={{display:"inline"}}>
                                <FormControlLabel value="Arrival" control={<Radio color="primary"  />} onClick={()=>setJourney("arrival")} label="Arrival" />
                                <FormControlLabel value="Departure" control={<Radio color="primary" />} onClick={()=>setJourney("departure")} label="Departure" />
   
                                </div> 
                                </RadioGroup>
                               </FormControl>
                           </div>
                           <form onSubmit={handleSubmit(handleChange)}>
                           <div>

                           </div>
                           <Grid style={{paddingLeft:"20px"}} container spacing={4}>
                           <Grid item xs={5}>
                              <TextField 
                                 autoComplete={false}
                                  fullWidth
                                  name="phone_number"  type="text"  id="outlined-basic" 
                                  label="Phone Number" variant="outlined"  
                                  inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})} 
                                  inputProps={{maxLength:10, style:{fontSize:20, fontWeight:'bold'}}}
                                  error={errors.phone_number ?true:false}
                                  InputLabelProps={{style:{fontSize:20}}}
               
                                  helperText={errors.phone_number? "Phone number is Invalid":""}
      
                              />
                           </Grid>
                           <Grid item xs={5}>
                              <TextField 
                              autoComplete={false}
                                  fullWidth
                                  name="pnr_number" id="outlined-basic" label="Pnr Number"
                                  variant="outlined" 
                                  inputRef={register({pattern: /^\d+$/,required: true , minLength:10})} 
                                  inputProps={{maxLength:10, style:{fontSize:20,fontWeight:'bold'}}}
                                  error={errors.pnr_number?true:false}
                                  InputLabelProps={{style:{fontSize:20}}}
                                  helperText={errors.pnr_number?"PNR number is Invalid":""}
                               />
                           </Grid>

                           </Grid>
                               <Button style={{marginTop:"20px", marginLeft:"35%", color:"white", fontSize:"4ex",background:"aqua", width:"250px", height:"60px"}}  type="submit" variant="contained"  color="primary" size="large">
                                Continue
                              </Button>
                               </form>
                               <div className="d-lg-block d-xl-block d-none d-md-block d-lg-none pt-4">
                                 <Modal state={send_data?state:{}}/>
                               </div>
                        </div>
                     
                     </div>
                  </div>
               </div>
            
            </div>
            
            <div className={classes.meetGreet}>
            <Typography variant="h3">Meet & Greet</Typography>
            <Divider style={{width:"100px"}}  light={false} component='h3'/>
            <Divider style={{width:"100px"}} light={false} component='h3'/>
            <Divider style={{width:"100px"}} light={false} component='h3'/>
            <br></br>
            <Grid container xs={12} spacing={4}>
                     <Grid item  xs={5}>
                        <Card className={classes.eachBox}>
                           <CardMedia image="https://cdn.pixabay.com/photo/2019/04/19/09/16/train-4138935_1280.jpg"></CardMedia>
                        </Card>
                     </Grid>
                     <Grid item xs={6}>
                        <Card elevation={0} className={classes.indiasOnly}>
                           <CardContent>  
                              <Typography variant="h5">
                                 <b style={{color:"#000066"}}>India's Only meet & greet Service</b>  
                              </Typography>
                              <br></br>
                              <Typography style={{marginLeft:"2%", marginRight:"2%"}} variant="h6"><b> 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt ut labore et dolore inov magna 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt
                              </b>
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                  </Grid>

            </div>

            {/* For boxes */}
            <br></br>
            <div className={classes.facilities}>
            <Typography variant="h3">Our Services</Typography>
            <Divider style={{width:"100px"}}  light={false} component='h3'/>
            <Divider style={{width:"100px"}} light={false} component='h3'/>
            <Divider style={{width:"100px"}} light={false} component='h3'/>
            <br></br>
                  <Grid container xs={12} spacing={1}>
                     <Grid xs={4}>
                        <Card className={classes.eachBox}>
                           <CardContent>  
                              <Typography variant="h5">
                                 <FlightLand fontSize="large"></FlightLand>
                                 <b style={{color:"#000066"}}>Arrival</b>  
                              </Typography>
                              <br></br>
                              <Typography style={{marginLeft:"2%", marginRight:"2%"}} variant="body1"><b> 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt ut labore et dolore inov magna 
                              </b>
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                     <Grid xs={4}>
                        <Card className={classes.eachBox}>
                           <CardContent>  
                              <Typography variant="h5">
                                 <FlightLand fontSize="large"></FlightLand>
                                 <b style={{color:"#000066"}}>Arrival</b>  
                              </Typography>
                              <br></br>
                              <Typography style={{marginLeft:"2%", marginRight:"2%"}} variant="body1"><b> 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt ut labore et dolore inov magna 
                              </b>
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                     <Grid xs={4}>
                        <Card className={classes.eachBox}>
                           <CardContent>  
                              <Typography variant="h5">
                                 <FlightLand fontSize="large"></FlightLand>
                                 <b style={{color:"#000066"}}>Arrival</b>  
                              </Typography>
                              <br></br>
                              <Typography style={{marginLeft:"2%", marginRight:"2%"}} variant="body1"><b> 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt ut labore et dolore inov magna 
                              </b>
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                  </Grid>

                  <br></br>
                  <Grid container xs={12} spacing={0}>
                     <Grid xs={4}>
                        <Card className={classes.eachBox}>
                           <CardContent>  
                              <Typography variant="h5">
                                 <FlightLand fontSize="large"></FlightLand>
                                 <b style={{color:"#000066"}}>Arrival</b>  
                              </Typography>
                              <br></br>
                              <Typography style={{marginLeft:"2%", marginRight:"2%"}} variant="body1"><b> 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt ut labore et dolore inov magna 
                              </b>
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                     <Grid xs={4}>
                        <Card className={classes.eachBox}>
                           <CardContent>  
                              <Typography variant="h5">
                                 <FlightLand fontSize="large"></FlightLand>
                                 <b style={{color:"#000066"}}>Arrival</b>  
                              </Typography>
                              <br></br>
                              <Typography style={{marginLeft:"2%", marginRight:"2%"}} variant="body1"><b> 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt ut labore et dolore inov magna 
                              </b>
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                     <Grid xs={4}>
                        <Card className={classes.eachBox}>
                           <CardContent>  
                              <Typography variant="h5">
                                 <FlightLand fontSize="large"></FlightLand>
                                 <b style={{color:"#000066"}}>Arrival</b>  
                              </Typography>
                              <br></br>
                              <Typography style={{marginLeft:"2%", marginRight:"2%"}} variant="body1"><b> 
                                 Lorem ipsum dolor sit amet, consecteuu adipiscing elit,
                                 sed do eiusmod tempory incididunt ut labore et dolore magnan th
                                 aliqua. incididunt ut labore et dolore inov magna 
                              </b>
                              </Typography>
                           </CardContent>
                        </Card>
                     </Grid>
                  </Grid>

                     

            </div>
           
         </>
}
export default Homepage;