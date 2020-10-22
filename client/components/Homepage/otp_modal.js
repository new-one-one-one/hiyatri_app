import { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import firebase from '../../helpers/firebase';
import Router from 'next/router';
import { userAuthenticate, authenticate } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

 const Modalbox = ({ state }) => {
  const classes = useStyles();

  const initialData = {
    open_modal:false,
    recaptcha:false,
    enter_otp:false,
    send_otp:true,
    send_otp_response:{},
    otp_code:""
  }

  const ACTIONS = {
    MODAL:"modal",
    RECAPTCHA:"recaptcha",
    SEND_OTP:"send_otp",
    ENTER_OTP:"enter_otp",
    SEND_OTP_RESPONSE:"send_otp_response",
    OTP_CODE:"otp_code"
  }

  const reducer = (state, action) => {
      switch (action.type) {
        case  ACTIONS.MODAL:
           return {...state, open_modal: action.data}
        case  ACTIONS.RECAPTCHA:
           return {...state, recaptcha: action.data}
        case  ACTIONS.ENTER_OTP:
           return {...state, enter_otp: action.data}
        case  ACTIONS.SEND_OTP:
           return {...state, send_otp: action.data}
        case  ACTIONS.SEND_OTP_RESPONSE:
           return {...state, send_otp_response: action.data}
        case  ACTIONS.OTP_CODE:
           return {...state, otp_code: action.data}
        default:
            return state
      }
  }
  const [data, dispatch] = useReducer(reducer, initialData)

  const handleClose = () => {
    dispatch({ type: ACTIONS.MODAL, data: false })
  };

  const handleChange = (e) => {
    dispatch({ type: ACTIONS.OTP_CODE, data: e.target.value })
  }
  const onSubmission = () => {
      if(state.phone_number.length !== 10){
        return console.log("Please enter a valid phone number")
      }
      if(state.pnr_number.length !== 10){
        return console.log("Please enter a valid PNR number")
      }
     dispatch({ type: ACTIONS.MODAL, data: true })
  }

   const newRecaptcha = () => {
       return new firebase.auth.RecaptchaVerifier("recaptcha-container");
   }

   const sendOTP = async () => {
       dispatch({ type: ACTIONS.RECAPTCHA, data: true })
       let recaptcha= await newRecaptcha();
       let number = "+91"+ state.phone_number;
       const response = await firebase.auth().signInWithPhoneNumber(number, recaptcha);
       dispatch({ type: ACTIONS.SEND_OTP_RESPONSE, data: response})
       dispatch({ type: ACTIONS.RECAPTCHA, data: false })
       dispatch({ type: ACTIONS.SEND_OTP, data: false })
       dispatch({ type: ACTIONS.ENTER_OTP, data: true })
   }

   const verifyOTP = () => {
       data.send_otp_response.confirm(data.otp_code)
         .then(response => {
           if(response.code){
             return console.log(response.code)
           }
           userAuthenticate({phone_number: state.phone_number})
             .then(result => {
               authenticate(result, () => {
                 Router.push('/booking')
               })
             })
             .catch(err => {
               console.log(err)
             })
         })
         .catch(err => {
           console.log(err)
         })
   }

  return (
    <div>
    <Button variant="contained" className="hp-continue-btn" onClick={onSubmission}>
       Continue
    </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={data.open_modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={data.open_modal}>
          <div className={classes.paper}>
              {data.send_otp &&
              <div className="text-center">
              <TextField variant="outlined" label="Phone No." fullWidth value={state.phone_number} />
              <Button onClick={sendOTP} variant="contained" className="hp-continue-btn m-2">SEND OTP</Button>
              </div>}
              {data.recaptcha &&
              <div id="recaptcha-container" />}
              {data.enter_otp &&
              <div>
              <TextField variant="outlined" label="OTP" fullWidth onChange={handleChange}/>
              <br />
              <Button variant="contained" className="m-2 md-btn" onClick={verifyOTP}>
              Verify OTP
              </Button>
              <Button variant="contained" className="m-2 md-btn">
              Resend OTP
              </Button>
              </div>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Modalbox;
