import React from "react";


const CabService = () => {


    return (
     
  <React.Fragment>
            {/* passenger's contact information */}
            <span>Cab Service</span>
            <table width="100%" >
                <tr>
                    <th>Destination</th>
                    <th>Bo. of Passengers</th>
                    <th>Luggage Bags</th>
                    <th>No. Of Cabs</th>
                    <th>Price</th>

                </tr>
                <tr>
                    <td><input value={"CHD Avenue -71 sector-71 Gurgaon"}/></td>
                    <td><input value={"4"}/></td>
                    <td><input value={"2"}/></td>
                    <td><input value={"2"}/></td>
                    <td><input value={"2200"}/></td>
                </tr>
            </table>
        </React.Fragment>

     
    );
}

export default CabService;