import BookingInformation from "./BookingInformation/BookInformation";
import PassengerInformation from "./PassengerContactInfo/PassengerContactInfo";
import PassengerDetails from "./PassengerDetails/PassengerDetails";
import PorterService from "../BookingPage/PorterService/PorterService";
import CabService from "./CabService/CabService";
import React, { useState } from "react";
import Header from "../Header/Header";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./main.css";
import { Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import { BookingPageSchema } from "./validationSchema";
import { SampleResponse } from "./sampleResponse";
import * as ICONS from "../../assets/Images";

const BookingPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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
        initialValues={{
          PassengerNumber: "",
          SecondaryMobile: "",
          email: "",
          SmallBags: 0,
          MediumBags: 0,
          LargeBags: 0,
        }}
        validationSchema={BookingPageSchema}
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

          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="container-div">
              {/* top most heading section */}
              <div className="top-subheading">
                <h1>MEET & GREET</h1>
                <br />
                <div className="pnr-heading">
                  <div>
                    <span>
                      Arrival - PNR No. -{SampleResponse.pnr_details.pnr_number}
                    </span>
                    <img
                      onClick={() => alert("editing")}
                      src={ICONS.EDIT_ICON}
                      alt="editIcon"
                    />
                  </div>

                  <span>
                    No. of Passengers -
                    {SampleResponse.pnr_details.no_of_passengers}
                  </span>
                </div>
              </div>

              <div className="booking-tables">
                <span className="sub-heading">Booking Information</span>

                <BookingInformation
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                />

                <span className="sub-heading">Passenger's Contact Information</span>
                <PassengerInformation
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                />

                <span className="sub-heading">Passenger's Details</span>
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
                <span className="sub-heading">Cab service (Only Available in Delhi NCR)</span>

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
                <Switch />

                <PorterService
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                  disabled={false}
                />

                {matches ? (
                  <div className="payable-amt-section">
                    <>
                      <div>
                        <span>Payable Amount</span>
                        <br />
                        <span style={{ fontWeight: "bold" }}>
                          &#x20b9; 4580
                        </span>
                      </div>
                      <Button
                        style={{ backgroundColor: "#00C4FF", width: "30%" }}
                        variant="outlined"
                        type="submit"
                      >
                        <span style={{ color: "white", fontWeight: "bold" }}>
                          Continue
                        </span>
                      </Button>
                    </>
                  </div>
                ) : (
                 
                    <Button
                      style={{
                        backgroundColor: "#00C4FF",
                        width: "100%",
                        position: "absolute",
                      }}
                      variant="outlined"
                      type="submit"
                    >
                      <span style={{ color: "white", fontWeight: "bold" }}>
                        REVIEW YOUR BOOKING & PAY &#x20b9;4580
                      </span>
                    </Button>
               
                )}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BookingPage;
