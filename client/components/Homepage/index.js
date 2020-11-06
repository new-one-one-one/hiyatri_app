import { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Modal from './otp_modal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';



const Homepage = () => {

  const initialData = {
    status: "",
    phone_number:"",
    pnr_number:"",
  }

  const ACTIONS = {
    PHONE:"phone",
    PNR:"pnr",
    STATUS:"status",
    ERROR_PH:"error"
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
  const handleChange  = name => e => {
        if(name==="phone"){
           dispatch({ type: ACTIONS.PHONE, data: e.target.value })
        }
        if(name==="pnr"){
          dispatch({ type: ACTIONS.PNR, data: e.target.value })
        }
        if(name==="status"){
          dispatch({ type: ACTIONS.STATUS, data: e.target.value })
        }
  }

console.log(state)
  return <>
            {<div className="hp-curve" />}
            <div className="hp-welcome">
               <div className="mb-hp-welcome d-sm-block d-md-none">
                  <img src="/images/home_welcome_mobile.jpg" width="100%" />
               </div>
               <div className="hp-welcome-inner">
                  <div className="row justify-content-center">
                     <div className="col-md-7 hp-inp-outer">
                        {/*<div className="d-lg-block d-xl-block d-none d-md-block d-lg-none">
                          <section className="hp-heading">
                          India's Only Meet & Greet Service
                          </section>
                          <section className="hp-subheading">
                          Avoid Long Lines With Our Personal VIP Assistance
                          </section>
                        </div>*/}

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
                                <OutlinedInput
                                variant="outlined"
                                type="Number"
                                error={false}
                                value={state.phone_number}
                                onChange={handleChange("phone")}
                                placeholder="Phone no."
                                className="hp-input"
                                fullWidth
                                startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                                />
                               {/*<small>Phone number is not valid</small>*/}
                               </div>
                               <div className="col-md-6">
                               <OutlinedInput
                               variant="outlined"
                               type="Number"
                               error={false}
                               value={state.pnr_number}
                               onChange={handleChange("pnr")}
                               className="hp-input"
                               placeholder="PNR No."
                               fullWidth/>
                                {/* <small>PNR number is not valid</small>*/}
                               </div>
                               <div className="d-lg-block d-xl-block d-none d-md-block d-lg-none pt-4">
                                 <Modal state={state}/>
                               </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="text-center d-sm-block d-md-none">
                 {<Modal state={state}/>}
               </div>
            </div>
         </>
}
export default Homepage;
