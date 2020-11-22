import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import Router from 'next/router';
import Recaptcha from 'react-recaptcha';
import { sendingOTP, verifyingOTP, authenticate } from '../../actions/auth';

const Login = () => {

const {register, errors,handleSubmit} = useForm()
const [phone_number, set_phone_number] = useState("");
const [otp_code, set_otp_code] = useState("");
const [session_id, set_session_id] = useState("");
const [recaptcha_check, set_recaptcha_check] = useState(false);
const [otp_sent, set_otp_sent] = useState(false);

  const onSubmit = (data) => {
    sendingOTP({ phone_number })
    .then(response => {
      if(response.error){
        return consle.log(response.error)
      }
      set_session_id(response.session_id)
      set_otp_sent(true)
    })
    .catch((err) => {
    })
  }

  const verify = () => {
    verifyingOTP({ otp_code, session_id, phone_number })
    .then(response => {
      if(response.error){
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


  return <>
           <div className="pt-5">
             <div className="row justify-content-center">
               <div className="col-md-4 lg-container">
                    <h2>Please Login</h2>
                  {!otp_sent && <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                       name="phone_number"
                       label="Phone number"
                       fullWidth
                       className="mb-1 mt-1"
                       onChange={e =>  set_phone_number(e.target.value)}
                       variant="outlined"
                       inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})}
                       error={errors.phone_number ?true:false}
                       helperText={errors.phone_number? "Phone number is Invalid":""} />

                       <Recaptcha
                         className="mb-2 mt-2 pt-1"
                         sitekey="6Le9rd8ZAAAAAMM-XB7SMhZUQCHa6OCbXry-nlWL"
                         render="explicit"
                         verifyCallback={verifyCallback}
                         />

                     <Button
                         variant="contained"
                         color="primary"
                         size="large"
                         disabled={!recaptcha_check}
                         onClick={handleSubmit(onSubmit)}
                         className="m-2">
                         Continue
                     </Button>
                  </form>}

                   {otp_sent && <form>
                       <TextField
                        name="otp"
                        label="OTP"
                        className="mb-1 mt-1"
                        fullWidth
                        onChange={e => set_otp_code(e.target.value)}
                        variant="outlined"
                         />
                         <Button
                             variant="contained"
                             color="primary"
                             size="large"
                             onClick={verify}
                             className="m-2">
                             Verify
                         </Button>
                         <Button
                             variant="contained"
                             color="primary"
                             size="large"
                             onClick={handleSubmit(onSubmit)}
                             className="m-2">
                             Resend
                         </Button>
                       </form>}
               </div>
             </div>
           </div>
         </>
}

export default Login;
