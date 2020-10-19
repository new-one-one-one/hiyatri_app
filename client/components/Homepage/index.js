import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const Homepage = () => {
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
                  <div className="row justify-content-center">
                      <div classNamehp="col-md-6">
                          <TextField label="Phone No."
                                      className="hp-detail-input"
                                      variant="outlined"
                                      size="small"/>

                          <TextField label="PNR No."
                                      className="hp-detail-input"
                                      variant="outlined"
                                      size="small"/>
                      </div>
                  </div>
                  <div className="text-center mt-2">
                  <Button variant="contained" className="hp-continue-btn">
                     Continue
                  </Button>
                  </div>
             </div>
         </>
}
export default Homepage;
