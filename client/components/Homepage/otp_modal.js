import { useReducer, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Router from 'next/router';
import Recaptcha from 'react-recaptcha';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { sendingOTP, verifyingOTP, authenticate } from '../../actions/auth';
import { get_details_by_pnr } from '../../actions/booking';
import { ToastContainer, toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import HashLoader from "react-spinners/HashLoader";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    zIndex:3000,
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 6),
  },
}));


 const Modalbox = ({ state, submit }) => {
  const classes = useStyles();
  const initialData = {
    open_modal:false,
    recaptcha:false,
    session_id: "",
    otp_code:"",
    send_btn:false,
  }




  const ACTIONS = {
    MODAL:"modal",
    RECAPTCHA:"recaptcha",
    SESSION_ID:"session_id",
    OTP_CODE:"otp_code",
    SEND:"send_btn"
  }

  const reducer = (state, action) => {
      switch (action.type) {
        case  ACTIONS.MODAL:
           return {...state, open_modal: action.data}
        case  ACTIONS.RECAPTCHA:
           return {...state, recaptcha: action.data}
        case  ACTIONS.OTP_CODE:
           return {...state, otp_code: action.data}
        case  ACTIONS.SESSION_ID:
          return {...state, session_id: action.data}
        case  ACTIONS.SEND:
          return {...state, send_btn: action.data}
        default:
            return state
      }
  }
  const [data, dispatch] = useReducer(reducer, initialData)
  const [showSpinner, setShowSpinner] = useState(false);

  const handleClose = () => {
    dispatch({ type: ACTIONS.MODAL, data: false })
  };



  const handleChange = (e) => {
    dispatch({ type: ACTIONS.OTP_CODE, data: e })
  }

  const onSubmission = () => {
      submit()
      if(state.phone_number.length !== 10){
        return;
      }
      if(state.pnr_number.length !== 10){
        return;
      }
      setShowSpinner(true)
       get_details_by_pnr(state.pnr_number)
        .then(response => {
          console.log(response)
          setShowSpinner(false);
          if(response.status==="error"){
            return toast.error(response.message)
          }
          dispatch({ type: ACTIONS.MODAL, data: true })
        })
        .catch((err) => {
          toast.error("Something went wrong! Try after sometime.")
        })

  }



  const send = () => {
    sendingOTP({phone_number: state.phone_number})
    .then(response => {
      if(response.error){
        return console.log(response.error)
      }
      toast.success(response.message)
      dispatch({ type: ACTIONS.SEND, data: true })
      dispatch({ type: ACTIONS.SESSION_ID, data: response.session_id })
    })
    .catch((err) => {
    })
  }

  const verify = () => {
   verifyingOTP({ phone_number: state.phone_number, session_id: data.session_id, otp_code: data.otp_code })
   .then(response => {
     if(!response){
       return toast.error("Something went wrong! Try after sometime.")
     }
     if(response.error){
        toast.error(response.error)
      return  console.log(response.error)
     }
      authenticate(response, () => {
          Router.push(`/booking/${state.status}?pnr=${state.pnr_number}`)
        })
     })
  }

  const verifyCallback = (response) => {
     if(response){
        dispatch({ type: ACTIONS.RECAPTCHA, data: true })
     }
  }

  return (
    <div>
      <div className="hp-loader">
        <HashLoader
        size={150}
        color={"blue"}
        loading={showSpinner} />
      </div>

     <div className="d-sm-block d-md-none">
       <Button variant="contained" className="hp-inpt-btn" onClick={onSubmission}>
          Continue
       </Button>
     </div>

     <div className="d-lg-block d-xl-block d-none d-md-block d-lg-none">
       <Button variant="contained" className="hp-inpt-btn" onClick={onSubmission}>
          Continue
       </Button>
     </div>

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
              {!data.send_btn && <div className="text-center">
              <OutlinedInput
              variant="outlined"
              type="Number"
              disabled={true}
              startAdornment={<InputAdornment position="start">+91</InputAdornment>}
              error={false}
              value={state.phone_number}
              placeholder="Phone no."
              className="hp-input mb-2 mt-2 pt-1"
              fullWidth
              />

              <Recaptcha
                className="mb-2 mt-2 pt-1"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
                render="explicit"
                verifyCallback={verifyCallback} />


              <Button
                onClick={send}
                disabled={!data.recaptcha}
                variant="contained"
                className="md-btn m-2">SEND OTP</Button>
              </div>}

              {data.send_btn && <div className="text-center">
              <OtpInput
                value={data.otp_code}
                containerStyle="m-otp-input"
                inputStyle="m-otp-input-each"
                onChange={handleChange}
                numInputs={6}
                separator={<span></span>}
              />
              <Button variant="contained" className="m-2 md-btn mt-4" onClick={verify}>
                Verify OTP
              </Button>
              {/*<Button variant="contained" className="m-2 md-btn">
                Resend OTP
              </Button>*/}
              </div>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Modalbox;
