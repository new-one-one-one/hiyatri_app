import { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Modal from './otp_modal';


const Homepage = () => {

  const initialData = {
    phone_number:"",
    pnr_number:"",
  }

  const ACTIONS = {
    PHONE:"phone",
    PNR:"pnr"
  }
  const reducer = (state, action) => {
      switch (action.type) {
        case  ACTIONS.PHONE:
           return {...state, phone_number: action.data}
        case  ACTIONS.PNR:
           return {...state, pnr_number: action.data}
        default:
            return state
      }
  }
  const [state, dispatch] = useReducer(reducer, initialData)
  const handleChange  = name => e => {
    name === "phone" ? dispatch({ type: ACTIONS.PHONE, data: e.target.value }):
                       dispatch({ type: ACTIONS.PNR, data: e.target.value })
  }



  return <>
            <div className="hp-curve" />
            <div className="hp-welcome">
                <section className="hp-welcome-text">
                    <h1 className="hp-title">MEET AND GREET</h1>
                    <p className="hp-desc">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer.
                    </p>
                </section>
            </div>
            <div className="hp-mg">
              <h2 className="hp-mg-title">TYPE OF MEET AND GREET</h2>
                <div className="row col justify-content-center">
                    <div className="col-md-4 hp-mg-card">
                        <header className="hp-mg-header">
                           Arrival Meet and Greet
                        </header>
                        <p className="hp-mg-desc">
                           Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                           when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div className="hp-btn-container">
                            <Button variant="contained" className="hp-mg-btn">
                               Choose Arrival
                            </Button>
                        </div>
                    </div>

                    <div className="col-md-4 hp-mg-card">
                        <header className="hp-mg-header">
                          Departure Meet and Greet
                        </header>
                        <p className="hp-mg-desc">
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div className="hp-btn-container">
                            <Button variant="contained" className="hp-mg-btn">
                               Choose Departure
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
             <div className="hp-detail-container container">
                  <small>Please provide basic detail t avail the services</small>
             </div>
             <div className="hp-details container">
                  <div className="row col justify-content-center">
                      <div className="col-md-4">
                          <TextField label="Phone No."
                                      fullWidth
                                      onChange={handleChange("phone")}
                                      className="hp-detail-input"
                                      variant="outlined"
                                      size="small"/>
                      </div>
                      <div className="col-md-4">
                          <TextField label="PNR No."
                                      fullWidth
                                      onChange={handleChange("pnr")}
                                      className="hp-detail-input"
                                      variant="outlined"
                                      size="small"/>
                      </div>
                  </div>
                  <div className="text-center mt-2">
                  <Modal state={state}/>
                  </div>
             </div>
         </>
}
export default Homepage;
