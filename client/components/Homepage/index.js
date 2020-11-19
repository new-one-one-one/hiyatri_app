import { useReducer, useState } from 'react';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import Modal from './otp_modal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import {useForm} from 'react-hook-form';



const Homepage = () => {
  const {register, errors,handleSubmit} = useForm()

  const initialData = {
    status: "",
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

  return <>
            {<div className="hp-curve" />}
            <div className="hp-welcome">
               <div className="mb-hp-welcome d-sm-block d-md-none">
                  <img src="/images/home_welcome_mobile.jpg" width="100%" />
               </div>
               <div className="hp-welcome-inner">
                  <div className="row justify-content-center">
                     <div className="col-md-7 hp-inp-outer">
                                <div className="hp-inp-container">
                                     <div className="hp-radio-btn">
                                         <FormControl component="fieldset">
                                         <RadioGroup
                                            aria-label="gender"
                                            name="gender1"
                                            row
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
                                          type="Text"
                                          inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})}
                                          error={errors.phone_number ?true:false}
                                          helperText={errors.phone_number? "Phone number is Invalid":""}

                                          onChange={handleChange("phone")}
                                          placeholder="Phone no."
                                          className="hp-input mt-2 mb-2"
                                          fullWidth

                                          />
                                         </div>
                                         <div className="col-md-6">
                                         <TextField
                                         variant="outlined"
                                         type="Number"
                                         name="pnr_number"
                                         inputRef={register({pattern: /^\d+$/,required: true , minLength:10})}
                                         error={errors.pnr_number?true:false}
                                         helperText={errors.pnr_number?"PNR number is Invalid":""}
                                         onChange={handleChange("pnr")}
                                         className="hp-input mt-2 mb-2"
                                         placeholder="PNR No."
                                         fullWidth/>
                                         </div>
                                         <div className="d-lg-block d-xl-block d-none d-md-block d-lg-none pt-4">
                                           <Modal state={state} submit={handleSubmit(onSubmit)}/>
                                         </div>
                                     </div>
                                </div>
                     </div>
                  </div>
               </div>
               <div className="text-center d-sm-block d-md-none">
                 {<Modal state={state} submit={handleSubmit(onSubmit)}/>}
               </div>
            </div>

            <div className="hp-mg-container container">
              <h1 className="hp-mg-heading">MEET & GREET</h1>
              <div className="row col justify-content-center">
                  <div className="col-md-4">
                    <section>
                      <img src="images/meet_greet.png" className="" width="100%"/>
                    </section>
                  </div>
                  <div className="col-md-6">
                    <div className="hp-mg-inner">
                       <heading className="hp-mg-title">India’s Only Meet & Greet Service</heading>
                       <section className="hp-mg-text">
                          We ensure an easy, fast and hassle free journey throughout major Cities in India.
                          Our Meet & Greet service will help bypass long lines, remove language barriers and make passing through the railway station easy.
                          Our agents assist passengers through all the railway station formalities and helping complete procedures at security, baggage collection and drop off.
                          Available to all passengers, on any train and in any ticket class.
                        </section>
                    </div>
                  </div>
              </div>
            </div>

            <div className="hp-service-container container">
            <h1 className="hp-service-heading">OUR SERVICES</h1>
            <div className="row col justify-content-center">
                <div className="col-md-3 hp-service-card">
                 <h2 className="hp-card-title">Arrival</h2>
                 <section>
                 Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                 Lorem Ipsum has been the industry’s standard dummy text
                 </section>
                </div>
                <div className="col-md-3 hp-service-card">
                <h2 className="hp-card-title">Departure</h2>
                <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text
                </section>
                </div>
                <div className="col-md-3 hp-service-card">
                <h2 className="hp-card-title">Cab Service</h2>
                 <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text
                </section>
                </div>
                <div className="col-md-3 hp-service-card">
                <h2 className="hp-card-title">Buggage Service</h2>
                 <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text
                </section>
                </div>
                <div className="col-md-3 hp-service-card">
                <h2 className="hp-card-title">Buggage Guaruntee</h2>
                 <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text
                </section>
                </div>
                <div className="col-md-3 hp-service-card">
                <h2 className="hp-card-title">Other Services</h2>
                 <section>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text
                </section>
                </div>
            </div>

            </div>

         </>
}
export default Homepage;
