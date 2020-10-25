import React from "react";


const BaggageGurantee=()=>{

    return(
        <div style={{ display: "flex", flexDirection: "row", width: "40%",alignItems:'center' }}>
        <input type="checkbox" style={{ height: "25px", width: "25px" }} />
        <span style={{ fontWeight: "bold", margin: "0px 20px 0px 20px" }}>
          Baggage Gurantee
        </span>
        <span> Starting &#x20b9;20 Per Bag* </span>
      </div>
    );
}
export default BaggageGurantee;