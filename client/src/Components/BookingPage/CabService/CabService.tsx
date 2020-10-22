import React, { useState, useEffect, useRef } from "react";
import "../main.css";

let autoComplete:any;

const loadScript = (url:any, callback:any) => {
  let script:any = document.createElement("script") ;
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery:any, autoCompleteRef:any) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery:any) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

interface IcabService {
  handleChange: any;
  handleBlur: any;
  errors: any;
  values: any;
  touched: any;
  disabled: any;
}

const CabService = (props: IcabService) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyANzNQonp3anUaNw6F-CVTwfOmFmAUP4EM&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="cab-Details">
      {/* passenger's contact information */}

      <table width="100%">
        <tr>
          <th>Destination</th>
          <th>No. of Passengers</th>
          <th>Luggage Bags</th>
          <th>No. Of Cabs</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>
            <input
              ref={autoCompleteRef}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter Destination"
              value={query}
              type="text"
              name="destination"
              onBlur={props.handleBlur}
              disabled={!props.disabled}
              
            />
            {/* <input disabled={!props.disabled} name="destination" value={props.values.destination} type="Text" onBlur={props.handleBlur} onChange={props.handleChange} /> */}
            <span className="errors">
              {props.errors.destination &&
                props.touched.destination &&
                props.errors.destination}
            </span>
          </td>
          <td>
            <input disabled={!props.disabled} value={"4"} />
          </td>
          <td>
            <input disabled={!props.disabled} value={"2"} />
          </td>
          <td>
            <input disabled={!props.disabled} value={"2"} />
          </td>
          <td style={{width:"20%"}}>
           <span>&#x20b9;300</span>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CabService;
