import { useReducer, useState } from 'react';
import Button from '@material-ui/core/Button';
import {TextField,InputAdornment} from '@material-ui/core';
import Modal from './otp_modal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import StaticData from './other_info';
import {useForm} from 'react-hook-form';
import { isAuth } from '../../actions/auth';
import { get_details_by_pnr } from '../../actions/booking';
import { ToastContainer, toast } from 'react-toastify';
import Router from 'next/router';
import HashLoader from "react-spinners/HashLoader";



const Homepage = () => {
  const {register, errors,handleSubmit} = useForm()

  const initialData = {
    status: "arrival",
    phone_number:"",
    pnr_number:"",
  }

  const ACTIONS = {
    PHONE:"phone",
    PNR:"pnr",
    STATUS:"status",
  }
  const reducer = (state, action) => {
      switch (action.type) {
        case  ACTIONS.PHONE:
           return {...state, phone_number: action.data}
        case  ACTIONS.PNR:
           return {...state, pnr_number: action.data}
        case  ACTIONS.STATUS:
          return {...state, status: action.data}
        default:
            return state
      }
  }
  const [state, dispatch] = useReducer(reducer, initialData)
  const [radioselect, setradioSelect] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleChange  = name => e => {
        if(name==="phone"){
          console.log(e.target.value)
           dispatch({ type: ACTIONS.PHONE, data: e.target.value })
        }
        if(name==="pnr"){
          dispatch({ type: ACTIONS.PNR, data: e.target.value })
        }
        if(name==="status"){
          dispatch({ type: ACTIONS.STATUS, data: e.target.value })
        }

  }

  const onSubmit = (data) => {
     console.log(data)
  }

  const onpnrSubmit = (data) => {
    setShowSpinner(true);
    get_details_by_pnr(state.pnr_number)
      .then(response => {
        setShowSpinner(false);
        if(response.status==="error"){
          return toast.error(response.message)
        }
       Router.push(`/booking/${state.status}?pnr=${state.pnr_number}`)
      })
      .catch((err) => {
        toast.error("Something went wrong! Try after sometime.")
      })

  }

  const showFormWhenLoggedIn = () => {
    return <div>
    {<div className="hp-welcome-text-c d-lg-block d-xl-block d-none d-md-block d-lg-none">
      <section className="hp-sub-1">India’s Only Meet & Greet Services</section>
      <section className="hp-sub-2">Avoid Long Lines With Our Personal VIP Assistance</section>
    </div>}
<div className="row justify-content-center">
    <div className="col-md-5 col-sm-10 hp-inp-container-l-o">
            <div className="row justify-content-center ">
                <div className='hp-inp-container-l'>
                 <FormControl component="fieldset">
                 <RadioGroup
                    row
                    value={state.status}
                    onChange={handleChange("status")}>
                   <FormControlLabel
                    value="arrival"
                    control={<Radio
                    color="primary"/>}
                    label="Arrival"/>
                   <FormControlLabel
                    value="departure"
                    control={<Radio
                    color="primary"/>}
                    label="Departure"
                    className="ml-5"/>
                 </RadioGroup>
                 </FormControl>

                 <TextField
                 variant="outlined"
                 type="Number"
                 size="small"
                 name="PNR_NUMBER"
                 inputRef={register({pattern: /^\d+$/,required: true , minLength:10})}
                 onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                 error={errors.PNR_NUMBER?true:false}
                 helperText={errors.PNR_NUMBER?"Valid PNR number is required":""}
                 onChange={handleChange("pnr")}
                 className="hp-input "
                 placeholder="PNR No."
                 fullWidth />


                <div className="text-center hp-mb-continue-btn">
                <Button variant="contained" className="hp-inpt-btn" onClick={handleSubmit(onpnrSubmit)}>
                  Continue
                </Button>
                </div>
             </div>
          </div>
      </div>
    </div>
  </div>
  }


const showFormWhenNotLoggedIn = () => {
   return <>
   {<div className="hp-welcome-text-c d-lg-block d-xl-block d-none d-md-block d-lg-none">
     <section className="hp-sub-1">India’s Only Meet & Greet Services</section>
     <section className="hp-sub-2">Avoid Long Lines With Our Personal VIP Assistance</section>
     </div>}
   <div className="row justify-content-center">
      <div className="col-md-6 hp-inp-outer">
                 <div className="hp-inp-container">
                      <div className="hp-radio-btn text-center p-1">
                          <FormControl component="fieldset">
                          <RadioGroup
                             aria-label="gender"
                             name="gender1"
                             row
                             value={state.status}
                             onChange={handleChange("status")}>
                            <FormControlLabel
                             value="arrival"
                             control={<Radio
                             color="primary"/>}
                             label="Arrival"/>
                            <FormControlLabel
                             value="departure"
                             control={<Radio
                             color="primary"/>}
                             label="Departure"
                             className="ml-5"/>
                          </RadioGroup>
                          </FormControl>
                      </div>
                      <div className="row justify-content-center">
                          <div className="col-md-6">
                           <TextField
                           variant="outlined"
                           name="phone_number"
                           type="Number"
                           size="small"
                           inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})}
                           error={errors.phone_number ?true:false}
                           InputProps={{startAdornment: <InputAdornment position="start">+91</InputAdornment>}}
                           helperText={errors.phone_number? state.phone_number? "Phone number is invalid":"Phone number is required":""}
                           onChange={handleChange("phone")}
                           onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                           placeholder="Phone no."
                           className="hp-input mt-2 mb-2"
                           fullWidth

                           />
                          </div>
                          <div className="col-md-6">
                          <TextField
                          variant="outlined"
                          type="Number"
                          size="small"
                          name="pnr_number"
                          inputRef={register({pattern: /^\d+$/,required: true , minLength:10})}
                          error={errors.pnr_number?true:false}
                          helperText={errors.pnr_number?state.pnr_number? "PNR number is invalid":"PNR number is required":""}
                          onChange={handleChange("pnr")}
                          onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                          className="hp-input mt-2 mb-2"
                          placeholder="PNR No."
                          fullWidth/>
                          </div>
                          <div className="d-lg-block d-xl-block d-none d-md-block d-lg-none hp-continue-btn">
                            <Modal state={state} submit={handleSubmit(onSubmit)}/>
                          </div>
                      </div>
               </div>
       </div>
   </div>
   <div className="text-center d-sm-block d-md-none hp-mb-continue-btn">
      {<Modal state={state} submit={handleSubmit(onSubmit)}/>}
   </div>
   </>
}


  return <>
             <ToastContainer />
             <div className="hp-loader">
               <HashLoader
               size={150}
               color={"blue"}
               loading={showSpinner} />
             </div>
             <div className="hp-curve" />
             <div className="hp-welcome">

              {<div className="mb-hp-welcome d-sm-block d-md-none">
                  <div className="hp-welcome-text-c">
                  <section className="hp-sub-1">India’s Only Meet & Greet Services</section>
                  <section className="hp-sub-2">Avoid Long Lines With Our Personal VIP Assistance</section>
                  </div>
               </div>}

               <div className="hp-welcome-inner">
               {isAuth() && showFormWhenLoggedIn()}
               {!isAuth() && showFormWhenNotLoggedIn()}
               </div>

            </div>
            <StaticData />
         </>
}
export default Homepage;
