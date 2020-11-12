import { useState } from "react";
import  {createComment} from './../../../actions/comments';


const BookingDetail = ({ data }) => {


   const showPassengers = () => {
       return data && data.response.booking.passenger_details.map((pass, i) => {
           return <div className="bd-banner-inner p-3 mt-4">
                    <div className="row">
                        <div className="col-6">
                          <b>{pass.passenger_name}</b>
                        </div>
                        <div className="col-6">
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                         {pass.meet_and_greet?"Meet and Greet":""}
                        </div>
                        <div className="col-6" />

                    </div>
                    <div className="row">
                        <div className="col-6">
                         {pass.wheel_chair?"Wheel Chair":""}
                        </div>
                        <div className="col-6" />

                    </div>
                    <div className="row">
                        <div className="col-6">
                        {pass.golf_cart?"Golf Cart":""}
                        </div>
                        <div className="col-6" />

                    </div>
                  </div>
       })
   }
   console.log(data)

  return <div className="mt-5 pt-5">
            <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="bd-banner-container">
                            <div className="bd-banner-inner">
                                    <div className="row bd-banner-heading">
                                        <div className="col-6">
                                            Booking ID: {data && data.response.booking.booking_id}
                                        </div>
                                        <div className="col-6">
                                            <div className="row justify-content-end">
                                            Pending
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-3">
                                            <b>Meeting Point:</b>
                                            <br />
                                            {data && data.response.booking.booking_information.is_arrival?
                                            data.response.booking.booking_information.reservation_upto.station_name:
                                            data.response.booking.booking_information.boarding_station.station_name}
                                        </div>
                                        <div className="col-4 p-3">
                                            <b>Time of {data && data.response.booking.booking_information.is_arrival?"Arrival":"Departure"}:</b>
                                            <br />
                                            {data && data.response.booking.booking_information.is_arrival?
                                            data.response.booking.booking_information.reservation_upto.time:
                                            data.response.booking.booking_information.boarding_station.time}
                                        </div>
                                        <div className="col-4 p-3">
                                            <b>No. of passengers:</b>
                                            <br />
                                            {data && data.response.booking.passenger_details.length}
                                        </div>
                                    </div>
                              </div>
                               {showPassengers()}
                           </div>
                    </div>

                    <div className="col-md-3">
                     <div className="row justify-content-center">
                       <div className="bd-agent-container">
                           <button className='bd-btn-agent'>
                             ASSIGN TO AGENT
                           </button>
                           <br />
                           <button className="bd-btn-cancel">
                             Cancel
                           </button>
                       </div>
                    </div>
                </div>
            </div>
         </div>
}
export default BookingDetail;
