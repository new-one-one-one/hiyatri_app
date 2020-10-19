import React from "react";
import Header from "../Header/Header";
import { makeStyles ,Theme, createStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '.././../firebase';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
const extraStyle = makeStyles((theme: Theme) =>
  
createStyles({
    formStyling: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    otpStyling: {
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              display: "none"
       }

    }
  }),
  
);
const useStyles = makeStyles({
  root: {
    width: "85%",
    marginTop: "1.3%",
    marginLeft: "7.5%",
    marginBottom: "3%",
    backgroundColor: "transparent",
  
  },
  title: {
    fontSize: 14,
  },

  cardContent: {
    flexDirection: "row",
    flexFlow: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingLeft: "1%",
    paddingRight: "1%",
    paddingBottom: "1%",
  },

  imageHolder: {
    padding: "0.5%",
    marginRight: "1%",
    marginBottom: "0.1%",
    height: "400px",
  },
  contentHolder: {
    width: "80%",
    marginBottom: "0.1%",
    height: "420px",
    paddingLeft: "1%",
    paddingRight: "2%",
    paddingTop: "0.8%",
  },
  button: {
    marginTop: '5%',
  },
  buttonStyling:{
    margin:"0",
    width:50,
    marginLeft:"200px"
    
  }
  
});

const LandingPage = () => {
  
  const classes = useStyles();
  const anotherClasses=extraStyle();
  var [value, setValue] = React.useState("Arrival");
  var [details, setDetails] = React.useState({name:"", phoneNumber:"", pnrVal:""});
  var [errorType, setError]=React.useState({pnr:"", phone:"", names:"",otpError:""});
  var [otpPop, setOtp]=React.useState(false);
  var [otp, setOtpVal] =React.useState("");
  var [reCaptcha, setRecaptcha] = React.useState(false);
  const [checkOtp, setConformation] = React.useState(Object);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const validateNumber= (event: React.ChangeEvent<HTMLInputElement>)=>{
    setDetails( prevDetails => ({
      ...prevDetails, phoneNumber: event.currentTarget.value
    }));
    if(errorType.phone!=="")
      setError(error =>({
        ...error, phone:""
      }));
  }
  
  const nameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setDetails( prevDetails => ({
      ...prevDetails, name:event.currentTarget.value
    }));   
    if(errorType.names!=="")
      setError(error =>({
        ...error, names:""
      }));
  }
  const Transition = React.forwardRef(function Transition(
      props: TransitionProps & { children?: React.ReactElement<any, any> },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
  const pnrCheck= (event: React.ChangeEvent<HTMLInputElement>)=>{
    setDetails( prevDetails => ({
      ...prevDetails, pnrVal:event.currentTarget.value
    }));
    if(errorType.pnr!=="")
      setError(error =>({
        ...error, pnr:""
      })); 
  }


  function check(){    
    let val = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    return val;
  }
  async function confirmCode() {
    try {
        await checkOtp.confirm(otp);
        setOtp(false);
        let myobj = document.getElementById("successfull");
        let successText = document.createTextNode("Success Fully verifyed OTP");
        if(myobj)
          myobj.appendChild(successText);
        if(myobj)
          myobj.remove();
        setError(prevState => ({
          ...prevState,
          otpError: "VALID"
           }));
    
    } catch (error) {
      setError(prevState => ({
        ...prevState,
        otpError: "OTP INVALID"
         }));
    }
  }

  const sendOTP = async() =>{
      setOtpVal("");
      setError(prevState => ({
        ...prevState,
        otpError: ""
        }));
      setOtp(false);  
      setRecaptcha(true); 
      let recaptcha= await check();
      let number = "+91"+details.phoneNumber;           
      const confirmation = await firebase.auth().signInWithPhoneNumber(number, recaptcha);
      setConformation(confirmation);
      setRecaptcha(false);
      setOtp(true);

  }

  const handleOpen = async() => {
    const errObj={
      pnrr: String(details.pnrVal).length,
      name: String(details.name).length,
      number:  String(details.phoneNumber).length
    };
    
    if(errObj.pnrr===10 && errObj.name && errObj.number===10){
      setError(error =>({
        ...error, pnrr:""
      }));  
      setError(error =>({
        ...error, phone:""
      }));
      setError(error =>({
        ...error, names:""
      }));
      await sendOTP();
    }
    else{
      if(errObj.number!==10)
          setError(errors=>({
            ...errors, phone:"Invalid number"
          }))
      if(errObj.pnrr!==10)
        await setError(errors=>({
          ...errors, pnr:"Invalid PNR"
        }))
      if(errObj.name===0)
        setError(errors=>({
          ...errors, names:"provide name"
        }))
    }

  };

  const handleClose = () => {
    setOtp(false);
  };
  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setOtpVal(event.currentTarget.value);
    setError(prevState => ({
      ...prevState,
      otpError: ""
       }));    
  }
  return (
    <div style={{ flexDirection: "column", flexFlow: "column", minHeight: '100vh', backgroundColor: '#F2F2F2' }}>
      <Header />
      <div className="main">
        <div className={classes.root} >
          <div className={classes.cardContent}>

            {/* This part is for image */}
            <Card className={classes.imageHolder} variant="outlined">
              <img
                height="300px"
                width="400px"
                alt="Train"
                src={
                  "https://fdn.gsmarena.com/imgroot/news/20/08/zte-axon-20-5g-camera-sample/-400/gsmarena_001.jpg"
                }
              />
            </Card>

            {/* This part is for text above form */}
            <Card className={classes.contentHolder} variant="outlined">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Meet & Greet
              </span>
              <br />
              <span style={{ lineHeight: "35px", }}>
                Looks like Something is working.
              </span>
              <br />
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                You are looking for
              </span>
              <br />
            

            {/* What kind of travel either departure or arrival ?  */}
              <FormControl component="fieldset">
                <RadioGroup row aria-label="anonymous" name="anonymous" value={value} onChange={handleChange}>
                  <FormControlLabel value="Arrival"  control={<Radio />} label="Arrival" />
                  <FormControlLabel value="Departure" control={<Radio />} label="Departure" />
                </RadioGroup>
              </FormControl>

              {/*This part is for form  */}
              
              <form style={{ marginTop: '3%' }} className={anotherClasses.formStyling}  autoComplete="off">
                <TextField 
                className={anotherClasses.otpStyling} 
                type="number"
                style={{ marginRight: '2%' }} id="filled-basic" 
                label="Phone No."  variant="filled" 
                onChange={validateNumber} 
                error={errorType.phone===""?false:true} helperText={errorType.phone} 
                inputProps={{
                  maxLength: 10
                }}
                value={details.phoneNumber}
                />
                <TextField  
                  style={{ marginRight: '2%' }} required={true}  
                  id="filled-basic" label="Name"
                  variant="filled" error={errorType.names===""?false:true} 
                  helperText={errorType.names}
                  onChange={nameChange}
                  value={details.name}
                />
                <TextField 
                inputProps={{ maxLength: 10   }}
                className={anotherClasses.otpStyling}  
                type="text" id="filled-basic" label="PNR No.(10 Digits)" 
                variant="filled" onChange={pnrCheck} 
                error={errorType.pnr===""?false:true} 
                helperText={errorType.pnr}
                value={details.pnrVal}
                 />
                 <br></br>
                 <br></br>
                <Button style={{marginLeft:"30%"}} variant="contained" color="primary" href={"#"+details.pnrVal+"#"+details.phoneNumber} onClick={handleOpen}>GET FACILITIES</Button>
              </form>

            <Dialog
                open={reCaptcha}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Are you a robot ?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <div id="recaptcha-container"></div>
                </DialogContentText>
              </DialogContent>

            </Dialog>

            <Dialog open={otpPop}  onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">OTP Verification</DialogTitle>
                    
                    <DialogContent >
                      <DialogContentText>OTP for mobile number :<p> {details.phoneNumber}</p> 
                      <TextField className={anotherClasses.otpStyling}  value={otp} autoFocus  id="outlined-basic" label="OTP" variant="outlined" type="number" onChange={handleOtpChange} error={errorType.otpError===""?false:true} helperText={errorType.otpError}/>
                    </DialogContentText>
              <DialogActions>
                    
                    <Button size="small" onClick={()=>confirmCode()} variant="contained" color="primary"> Check OTP</Button>
                    <Button size="small" onClick={sendOTP} variant="contained" color="secondary">Re-send </Button>
                </DialogActions>
            </DialogContent>
        
            </Dialog>
            
            <Dialog
              open={errorType.otpError==="VALID"?true:false}
              TransitionComponent={Transition}
              keepMounted
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"Mobile Verification Success"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Succefully Verified mobile number {details.phoneNumber}
                </DialogContentText>
              </DialogContent>
            
            </Dialog>
                       
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

};

export default LandingPage;
