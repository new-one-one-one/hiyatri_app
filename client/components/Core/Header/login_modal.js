import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField,InputAdornment} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import Router from 'next/router';
import Recaptcha from 'react-recaptcha';
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from 'react-toastify';
import { sendingOTP, verifyingOTP, authenticate } from '../../../actions/auth';
import Countdown from "react-countdown";



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    borderRadius:"8px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 7, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const {register, errors,handleSubmit} = useForm()
  const [phone_number, set_phone_number] = useState("");
  const [otp_code, set_otp_code] = useState("");
  const [session_id, set_session_id] = useState("");
  const [recaptcha_check, set_recaptcha_check] = useState(false);
  const [otp_sent, set_otp_sent] = useState(false);
  const [resend_otp, set_resend_otp] = useState(false);

    const onSubmit = (data) => {
      sendingOTP({ phone_number })
      .then(response => {
        if(response.error){
          toast.error(response.error)
          return console.log(response.error)
        }
        set_session_id(response.session_id)
        set_otp_sent(true)
        set_resend_otp(true)
      })
      .catch((err) => {
      })
    }

    const verify = () => {
      verifyingOTP({ otp_code, session_id, phone_number })
      .then(response => {
        if(!response){
          return toast.error("Something went wrong! Try after sometime.")
        }
        if(response.error){
            toast.error(response.error)
          return console.log(response.error)
        }
         authenticate(response, () => {
             Router.push(`/`)
           })
        })
    }

    const verifyCallback = (response) => {
       if(response){
          set_recaptcha_check(true)
       }
    }


  const handleResendOTP = () => {
       set_resend_otp(true)
       onSubmit()
  }

    const renderer = ({ minutes, seconds, completed }) => {
      if (completed) {
         set_resend_otp(false)
          return  "";
      } else {
        return (
          <div className="otp-resend">
            Resend OTP in {'00'}:{seconds}
          </div>
        );
      }
    };


  return (
    <div>
     <Button variant="contained" onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <ToastContainer />
            <div className="">
              <div className="row justify-content-center">
                <div className="col-md-4 lg-container">
                     <h2 className="login-modal-title">LOGIN/ JOIN US</h2>
                   {!otp_sent && <form onSubmit={handleSubmit(onSubmit)}>
                       <TextField
                        variant="outlined"
                        name="phone_number"
                        type="Number"
                        size="small"
                        inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})}
                        error={errors.phone_number ?true:false}
                        InputProps={{startAdornment: <InputAdornment position="start">+91</InputAdornment>}}
                        helperText={errors.phone_number? "Phone number is Invalid":""}
                        onChange={e =>  set_phone_number(e.target.value)}
                        onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                        placeholder="Mobile no."
                        className="hp-input mt-2 mb-2"
                        fullWidth />

                        <Recaptcha
                          className="mb-2 mt-2 pt-1"
                          sitekey="6Le9rd8ZAAAAAMM-XB7SMhZUQCHa6OCbXry-nlWL"
                          render="explicit"
                          verifyCallback={verifyCallback}
                          />

                      <Button
                          size="large"
                          disabled={!recaptcha_check}
                          onClick={handleSubmit(onSubmit)}
                          className="m-2 md-btn">
                          Continue
                      </Button>
                   </form>}

                    {otp_sent && <form>
                      <div className="otp-msg">OTP has been sent to {phone_number}</div>
                          <OtpInput
                            value={otp_code}
                            onChange={e => set_otp_code(e)}
                            containerStyle="m-otp-input"
                            inputStyle="m-otp-input-each"
                            numInputs={6}
                            separator={<span></span>}
                          />
                          {resend_otp && <Countdown date={Date.now() + 30000} renderer={renderer}/>}
                          {!resend_otp && <div className="otp-resend"   onClick={handleResendOTP}>Resend OTP</div>}
                          <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={verify}
                              className="m-2 md-btn">
                              Submit
                          </Button>
                        </form>}
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
