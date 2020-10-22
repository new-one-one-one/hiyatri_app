import BookingInformation from "./BookingInformation/BookInformation";
import PassengerInformation from "./PassengerContactInfo/PassengerContactInfo";
import PassengerDetails from "./PassengerDetails/PassengerDetails";
import PorterService from "../BookingPage/PorterService/PorterService";
import CabService from "./CabService/CabService";
import React, { useState } from "react";
import Header from "../Header/Header";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import "./main.css";
import { Formik } from "formik";

const BookingPage = () => {
  let [state, setState] = useState({
    checkedA: false,
    otherServices1: true,
    otherServices2: true,
    otherServices3: true,
    otherServices4: true,
  });

  let ToggleHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const toggler = (event: any) => {
    switch (event.target.name) {
      case "firstRow":
        setState({ ...state, otherServices1: !state.otherServices1 });
        break;

      case "secondRow":
        setState({ ...state, otherServices2: !state.otherServices2 });
        break;

      case "thirdRow":
        setState({ ...state, otherServices3: !state.otherServices3 });
        break;

      case "fourthRow":
        setState({ ...state, otherServices4: !state.otherServices4 });
        break;
      default:
        setState({ ...state });
        break;
    }
  };

  return (
    <div className="main-div">
      <Header />
      <Formik
        initialValues={{ PassengerNumber: "", email: "", PassengerName: "" ,PorterService:{
            largeBags:'',
            smallBags:'',
            mediumBags:''
        }}}

        validate={(values) => {
          const errors: any = {};

          if (!values.PassengerName) {
            errors.PassengerName = "Required";
          } else if (/^[a-zA-Z\s]*$/.test(values.PassengerName)) {
            errors.PassengerName = "Invalid Passenger Name";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.PassengerNumber) {
            errors.PassengerNumber = "Required";
          } else if (/^[1-9]{1}[0-9]{9}$/.test(values.PassengerNumber)) {
            errors.PassengerNumber = "Invalid Passenger Number";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="container-div">
                {/* top most heading section */}
                <div className="top-subheading">
                <h1>MEET & GREET</h1>
              <br />
              <div className="pnr-heading">
                <span>Arrival - PNR No. - 20YB305 </span>
                <span> No. of Passengers - 4</span>
              </div>
                </div>
             
              <div className="booking-tables">
                <span>Booking Information</span>

                <BookingInformation
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                />

                <span>Passenger's Contact Information</span>
                <PassengerInformation
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                />

        <span>Passenger's Details</span>
                <PassengerDetails
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                  otherServices1={state.otherServices1}
                  otherServices2={state.otherServices2}
                  otherServices3={state.otherServices3}
                  otherServices4={state.otherServices4}
                  toggler={toggler}
                />
                <br />
                <span>Cab service</span>

                <Switch
                  checked={state.checkedA}
                  onChange={ToggleHandleChange}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />

                <CabService
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                  disabled={state.checkedA}
                />

                <span>Porter Service</span>
                <Switch/>
                
                <PorterService 
                
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
                disabled={false}
                />

                <div className="payable-amt-section">
                <div>
                <span >Payable Amount</span>
                <br/>
                <span style={{fontWeight:"bold"}}>&#x20b9; 4580</span>
                </div>
                <Button style={{backgroundColor:'#00C4FF',width:'30%'}} variant="outlined" type="submit">
                    <span style={{color:'white',fontWeight:'bold'}}>Continue</span>
                  </Button>
            </div>
             
              
              </div>
            </div>
           
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BookingPage;
