import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import Router from 'next/router';
import Recaptcha from 'react-recaptcha';
import { sendingOTP, verifyingOTP, authenticate } from '../../actions/auth';

const Login = () => {
  const {register, errors,handleSubmit} = useForm()

  const [state, setState] = useState({
    phone_number:"",
    otp_code:"",
    session_id:"",
    recaptcha_check: false,
    otp_sent: false
  });




  const onSubmit = (data) => {
    sendingOTP(state)
    .then(response => {
      if(response.error){
        return consle.log(response.error)
      }
      setState({...state, session_id: response.session_id })
      setState({...state, otp_sent: true })
    })
    .catch((err) => {
    })
  }

  const verify = () => {
    verifyingOTP(state)
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
         setState({...state, recaptcha_check: true })
     }
  }


  const handleChange  = name => e => {
        if(name==="phone"){
           setState({...state, phone_number: e.target.value })
        }
        if(name==="otp"){
           setState({...state, otp_code: e.target.value })
        }
  }

  return <>
           <div className="mt-5 pt-5 p-3">
             <div className="row justify-content-center">
               <div className="col-md-4 lg-container">

                  {!state.otp_sent && <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                       name="phone_number"
                       label="Phone number"
                       fullWidth
                       className="mb-1 mt-1"
                       onChange={handleChange("phone")}
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
                         disabled={!state.recaptcha_check}
                         onClick={handleSubmit(onSubmit)}
                         className="m-2">
                         Continue
                     </Button>
                  </form>}

                   {state.otp_sent && <form>
                       <TextField
                        name="otp"
                        label="OTP"
                        className="mb-1 mt-1"
                        fullWidth
                        onChange={handleChange("otp")}
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
