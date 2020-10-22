
import React, {useReducer} from "react";
import Header from "../Header/Header";
import { makeStyles ,Theme, createStyles} from "@material-ui/core/styles";
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

interface DetailState{
  name:string;
  phoneNumber:string;
  pnrVal:string;
  pnrError:string;
  phoneError:string; 
  nameError:string;
  otpError:string;
  otpVal:string;
  otpPop:string;
  reCaptcha:string;
}

interface DetailActions  {
  type:string;
  payload:string;
}

const detailsReducer = (detail_state:DetailState, action:DetailActions) =>{
  switch (action.type){
    case "setName":
      return {...detail_state, name:action.payload};
    case "setNumber":
      return {...detail_state, phoneNumber:action.payload};
    case "setPnrVal":
      return {...detail_state, pnrVal:action.payload};
    case "setOtpVal":
      return {...detail_state, otpVal:action.payload}; 
    case "setRecaptcha":
      return {...detail_state, recaptcha:action.payload};
    case "setPnrError":
      return {...detail_state, pnrError:action.payload};
    case "setOtpError":
      return {...detail_state, otpError:action.payload};
    case "setPhoneError":
      return {...detail_state, phoneError:action.payload};
    case "setNameError":
      return {...detail_state, nameError:action.payload};
    case "allowFillOtp":
      return {...detail_state, otpPop:action.payload}
    default:
      return {...detail_state}
  }
}
const LandingPage = () => {
  
  const anotherClasses=extraStyle();
  const [detail, dispatchDetail] = React.useReducer(detailsReducer,
  { 
    name:"",
    phoneNumber:"",
    pnrVal:"",   
    pnrError:"",
    phoneError:"",
    nameError:"",
    otpError:"0",
    otpVal:"",
    otpPop:"0",
    reCaptcha:"0"
  });
  const [checkOtp, setConformation] = React.useState(Object);
  const [recap,setRecaptcha] = React.useState(false);

  // Setting up form values
  const validateNumber= (event: React.ChangeEvent<HTMLInputElement>)=>{
    
        dispatchDetail({type:"setNumber", payload:event.currentTarget.value});
        if(detail.phoneError!=="")
            dispatchDetail({type:"setPhoneError", payload:""});  
  }
  const nameChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    dispatchDetail({type:"setName", payload:event.currentTarget.value});  
    if(detail.nameError!=="")
        dispatchDetail({type:"setNameError", payload:""});
  }
  const pnrCheck= (event: React.ChangeEvent<HTMLInputElement>)=>{
    dispatchDetail({type:'setPnrVal', payload:event.currentTarget.value});
    if(detail.pnrError!=="")
        dispatchDetail({type:"setPnrError", payload:""});
  }
  const Transition = React.forwardRef(function Transition(
      props: TransitionProps & { children?: React.ReactElement<any, any> },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
  

  
  // make user wait until recaptcha not verified
  function check(){    
    let val = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    return val;
  }

  async function confirmCode() {
    try {
        await checkOtp.confirm(detail.otpVal);
        dispatchDetail({type:"allowFillOtp", payload:"0"});
        let myobj = document.getElementById("successfull");
        let successText = document.createTextNode("Success Fully verifyed OTP");
        if(myobj)
          myobj.appendChild(successText);
        if(myobj)
          myobj.remove();
    } catch (error) {
      dispatchDetail({type:"setOtpError", payload:"1"});
    }
  }

  const sendOTP = async() =>{
      dispatchDetail({type:"setOtpVal", payload:""}); 
      dispatchDetail({type:"setOtpError", payload:"1"});
      dispatchDetail({type:"allowFillOtp", payload:"0"}); 
    setRecaptcha(true);
      console.log(detail.reCaptcha)
      let recaptcha= await check();
      let number = "+91"+detail.phoneNumber;           
      const confirmation = await firebase.auth().signInWithPhoneNumber(number, recaptcha);
      setConformation(confirmation);
      setRecaptcha(false);
      dispatchDetail({type:"allowFillOtp", payload:"1"}); 

  }

  const handleOpen = async() => {
    const errObj={
      pnrr: detail.pnrVal.length,
      name: detail.name.length,
      number: detail.phoneNumber.length
    };
    
 
  // this checks if no error exists then send OTP
   if(errObj.pnrr===10 && errObj.name && errObj.number===10){
      // await sendOTP();
      dispatchDetail({type:"setNameError", payload:""});
      dispatchDetail({type:"setPnrError", payload:""});
      dispatchDetail({type:"setPhoneError", payload:""});
      await sendOTP();
    }
    else{
      if(errObj.number!==10)
        dispatchDetail({type:"setPhoneError", payload:"Invalid number"});
      if(errObj.pnrr!==10)
        dispatchDetail({type:"setPnrError", payload:"Invalid PNR"});
      if(!errObj.name) 
        dispatchDetail({type:"setNameError", payload:"Please enter name"});
    }
  };

  const handleClose = () => {
    dispatchDetail({type:"allowFillOtp", payload:"0"}); 
  };
  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    dispatchDetail({type:"setOtpVal", payload:event.currentTarget.value});
    dispatchDetail({type:"setOtpError", payload:"0"});
  }
  return (
    <div style={{ flexDirection: "column", flexFlow: "column", minHeight: '100vh', backgroundColor: '#F2F2F2' }}>
      <Header />
    <div className="main">            
    <form style={{ marginTop: '3%' }} className={anotherClasses.formStyling}>
            <TextField 
                className={anotherClasses.otpStyling} 
                type="text"
                style={{ marginRight: '2%' }} id="filled-basic" 
                label="Phone No."  variant="filled" 
                inputProps={{maxLength: 10}}
                onChange={validateNumber}
                value={detail.phoneNumber}
                helperText={detail.phoneError}
            />

            <TextField  
                style={{ marginRight: '2%' }}  
                id="filled-basic" label="Name"
                variant="filled" 
                onChange={nameChange}
                value={detail.name}
                helperText={detail.nameError}
            />
            <TextField 
                inputProps={{ maxLength:10}}
                className={anotherClasses.otpStyling}  
                type="text" id="filled-basic" label="PNR No.(10 Digits)" 
                variant="filled" 
                onChange={pnrCheck}
                value={detail.pnrVal}
                helperText={detail.pnrError}
            />
            <br></br>
            <br></br>
        <Button onClick={handleOpen}>SUBMIT</Button>
        </form>

            <Dialog
                open={recap}
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

            <Dialog open={detail.otpPop==="0"?false:true}  onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">OTP Verification</DialogTitle>
                    
                    <DialogContent >
                      <DialogContentText>OTP for mobile number :<p> {detail.phoneNumber}</p> 
                      <TextField className={anotherClasses.otpStyling}  value={detail.otpVal} autoFocus  id="outlined-basic" label="OTP" variant="outlined" type="number" onChange={handleOtpChange} error={detail.otpError==="0"?false:true} helperText={detail.otpError}/>
                    </DialogContentText>
              <DialogActions>
                    
                    <Button size="small" onClick={()=>confirmCode()} variant="contained" color="primary"> Check OTP</Button>
                    <Button size="small" onClick={sendOTP} variant="contained" color="secondary">Re-send </Button>
                </DialogActions>
            </DialogContent>
        
            </Dialog>
            
            <Dialog
              open={detail.otpError==="VALID"?true:false}
              TransitionComponent={Transition}
              keepMounted
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"Mobile Verification Success"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Succefully Verified mobile number {detail.phoneNumber}
                </DialogContentText>
              </DialogContent>
            
            </Dialog> 
        
                       
              </div>
          </div>
      );

};

export default LandingPage;
