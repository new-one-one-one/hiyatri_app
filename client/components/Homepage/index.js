import { useReducer, useState } from 'react';
import Button from '@material-ui/core/Button';
import {TextField,InputAdornment} from '@material-ui/core';
import Modal from './otp_modal';
// import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import StaticData from './other_info';
import {useForm} from 'react-hook-form';
import { isAuth } from '../../actions/auth';
import { get_details_by_pnr } from '../../actions/booking';
import { ToastContainer, toast } from 'react-toastify';
import Router from 'next/router';
import Loader from 'react-loader-spinner'
import useWindowSize from '../../helpers/windowDimension';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Radio } from 'antd';

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
  const { width } = useWindowSize();


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
    <div className="row justify-content-center">
        <div className="col-md-4 col-sm-8 hp-inp-container-l-o text-center">
                <div className="row justify-content-center">
                    <div className='hp-inp-container-l'>
                     <FormControl component="fieldset" className="mb-3">
                         <Radio.Group onChange={handleChange("status")} value={state.status}>
                          <Radio value="arrival">Arrival</Radio>
                          <Radio value={"departure"}>Departure</Radio>
                        </Radio.Group>
                     </FormControl>

                     <TextField
                     variant="outlined"
                     type="number"
                     size="small"
                     name="PNR_NUMBER"
                     inputRef={register({pattern: /^\d+$/,required: true , minLength:10})}
                     onInput={(e)=>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                     error={errors.PNR_NUMBER?true:false}
                     helperText={errors.PNR_NUMBER?"Valid PNR number is required":""}
                     onChange={handleChange("pnr")}
                     className="hp-input"
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
     <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12 hp-inp-outer">
                   <div className="hp-inp-container">
                        <div className="hp-radio-btn text-center">
                            <FormControl component="fieldset">
                              <Radio.Group onChange={handleChange("status")} value={state.status}>
                               <Radio value="arrival">Arrival</Radio>
                               <Radio value={"departure"}>Departure</Radio>
                             </Radio.Group>
                            </FormControl>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                              <div className="row justify-content-center">
                                <TextField
                                variant="outlined"
                                name="phone_number"
                                type="number"
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

                            </div>
                            <div className="col-md-5">
                              <div className="row justify-content-center">
                                <TextField
                                variant="outlined"
                                type="number"
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
                              </div>
                            <div className="d-lg-block d-xl-block d-none d-md-block d-lg-none hp-continue-btn">
                              <Modal state={state} submit={handleSubmit(onSubmit)}/>
                            </div>
                        </div>
                 </div>
         </div>
         <div className="text-center d-sm-block d-md-none hp-mb-continue-btn">
            {<Modal state={state} submit={handleSubmit(onSubmit)}/>}
         </div>
     </div>

   </>
}


  return <>
             <ToastContainer />
             <div className="hp-loader">
             <Loader
                 type="Oval"
                 color="#00bcd4"
                 height={150}
                 width={150}
                 visible={showSpinner}
              />
             </div>
             {/*<div className="hp-curve" />*/}
             <div className="">
               <div className="row col justify-content-center">
                 <div className="col-md-6 col-md-8 col-sm-12">
                 {width > 766 && <LazyLoadImage src="/images/tag_line1.svg" className="tag_line1"/>}
                 {width > 766 && <LazyLoadImage src="/images/tag_line2.svg" className="tag_line2"/>}
                 </div>
               </div>

             {width < 766 && <LazyLoadImage src="/images/tag_line.svg" className="tag_line"/>}
             <LazyLoadImage src="/images/main-img.jpg" className="main-img"/>

             </div>
             <div className="">

               <div className="hp-welcome-inner">
               {isAuth() && showFormWhenLoggedIn()}
               {!isAuth() && showFormWhenNotLoggedIn()}
               </div>

            </div>
            <StaticData />
         </>
}
export default Homepage;
