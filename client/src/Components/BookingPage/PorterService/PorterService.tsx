import React from "react";
import "../../BookingPage/main.css";


interface Iprops{

    handleChange:any,
    handleBlur:any,
    values:any,
    errors:any,
    touched:any,
    disabled:Boolean

}

const PorterService = (props:Iprops) => {
  return (
    <div className="porter-Service">
      <table width="100%">
        <tr>
          <th>No. of Large Bags</th>
          <th>No. of Medium Bags</th>
          <th>No. of Small Bags</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>
            <input onChange={props.handleChange}  onBlur={props.handleBlur} value={props.values.PorterService.largeBags}/>
          </td>
          <td>
            <input onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.PorterService.mediumBags}/>
          </td>
          <td>
            <input />
          </td>
          <td style={{width:'20%'}}>
          &#x20b9;300
          </td>
        </tr>
      </table>

      <div style={{display:'flex',flexDirection:'row',width:"40%"}}> 
      <input type="checkbox" style={{height:'20px',width:'20px'}}/>
      <span style={{fontWeight:"bold",margin:'0px 20px 0px 20px'}}>Baggage Gurantee</span>
      <span> Starting &#x20b9;20 Per Bag* </span>
      </div>
  
        
    </div>
  );
};
export default PorterService;
