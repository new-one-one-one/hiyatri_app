import BookingInformation from "./BookingInformation/BookInformation";
import PassengerInformation from "./PassengerContactInfo/PassengerContactInfo";
import PassengerDetails from "./PassengerDetails/PassengerDetails";
import CabService from "./CabService/CabService";

import React from "react";
import Header from "../Header/Header";

import "./main.css";

const BookingPage = () => {

    return (
        <form>
            <div className="main-div">
                <Header />
                <div >
                    <div className="container-div">
                        <h1>Meet & Greet</h1>
                        <br />
                        <div className="pnr-heading">
                            <span>Arrival - PNR No. - 20YB305 </span>
                            <span> No. of Passengers - 4</span>
                        </div>
                        <div className="booking-tables">
                            <BookingInformation />
                            <PassengerInformation />
                            <PassengerDetails />
                            <CabService />
                        </div>
                        
                    </div>
                    <button type="submit">Continue</button>
                </div>

            </div>

        </form>
    );
}
export default BookingPage;