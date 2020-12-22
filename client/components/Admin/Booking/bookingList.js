import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { Select } from '@material-ui/core';
import {agent_list} from './../../../actions/order';
import { getCookie } from '../../../actions/auth';


const EditCommandCell = props => {
    return (
        <td>
            <button
                className="k-button k-primary"
                onClick={() => Router.push(`/admin/booking/detail/${props.dataItem._id}`)}>
                View Details
      </button>
        </td>
    );
};


const BookingList = ({ list }) => {
  const [state, setState] = useState({});
  const [filter_type , filterData] = useState("DISPLAY_All");
  const [booking_type, setBooking] = useState("All");
  const [agent_name, setAgent] = useState("All_AGENTS");
  const token = getCookie("token");
  const [all_agents, setAgents] = useState();

  const createState = (skip, take) => {
    var temp=list;

    // Filter logic
    if( filter_type==="DISPLAY_All" && booking_type==="All")
        temp=list;
    else if( filter_type!=="DISPLAY_All" && booking_type!=="All"){
        temp = temp.filter((val) => val.booking_type===booking_type && val.booking_status===filter_type);
    }
    else{
        if(filter_type==="DISPLAY_All")
            temp = temp.filter((val) => val.booking_type===booking_type);
        if(booking_type==="All")
            temp = temp.filter((val) => val.booking_status===filter_type);
    }
    if(agent_name!=="All_AGENTS")
        temp = temp.filter((val) => val.agent!==null&& val.agent.phone_number===agent_name);

    return {
      agent_name : agent_name,
      booking_type:booking_type,
      filter_type:filter_type,
      items: temp && temp.slice(skip, skip + take),
      total: temp && temp.length,
      skip: skip,
      pageSize: take,
      pageable: state ? state.pageable : {
          buttonCount: 5,
          info: false,
          type: 'numeric',
          pageSizes: true,
          previousNext: false
      }
    }
  }

    useEffect(() => {
        setState(createState(0, 10))
    },[list, filter_type, booking_type, agent_name])


    // Fetching agent list
    useEffect(()=>{
        agent_list(token)
            .then(response => {
                if(response.error){
                    return console.log(response.error)
                }
                setAgents(response.agents);
            }).catch((err) => {
                console.log(err)
            })
        }, [])

    const pageChange = (event) => {
        setState(createState(event.page.skip, event.page.take));
    }

  const MyEditCommandCell = props => (
            <EditCommandCell {...props} />
        );
    return (
        <div>
        <section className="filters-container">
             <div className="filters">
                <button className="filter-btn">
                    <div className="filter-status">
                        <b>Status:</b> {filter_type}
                    </div>
                </button>
                <div className="filter-content">
                    <button className="filter-option" onClick={()=>filterData("DISPLAY_All")} >All</button>    
                    <button className="filter-option" onClick={()=>filterData("ASSIGN_TO_AGENT")} >ASSIGN_TO_AGENT</button>
                    <button className="filter-option" onClick={()=>filterData("COMPLETED")} >COMPLETED</button>
                    <button className="filter-option" onClick={()=>filterData("ASSIGN_TO_ADMIN")}>ASSIGN_TO_ADMIN</button>
                    <button className="filter-option" onClick={()=>filterData("CANCELLED")}>CANCELLED</button>
                </div>
            </div>
            <div className="filters-1">
                <button className="filter-btn-1">
                    <div className="filter-status-1">
                        <b>Type:</b> {booking_type}
                    </div>
                </button>
                <div className="filter-content-1">
                    <button className="filter-option-1" onClick={()=>setBooking("All")} >All</button>   
                    <button className="filter-option-1" onClick={()=>setBooking("Arrival")} >Arrival</button>    
                    <button className="filter-option-1" onClick={()=>setBooking("Departure")} >Departure</button>
                </div>
            </div>
            <div className="filters-2">
                <button className="filter-btn-2">
                    <div className="filter-status-2">
                        <b>Agent :</b> {agent_name}
                    </div>
                </button>
                <div className="filter-content-2">
                    <button className="filter-option-2" onClick={()=>setAgent("All_AGENTS")} >
                        All Agents
                    </button>   
                    {(all_agents) && all_agents.map(element => {
                        return <button className="filter-option-2" onClick={()=>setAgent(element.phone_number)} >
                                    {element.name} ({element.phone_number})
                                </button>   
                    })} 
                </div>
            </div>
         
        
        </section>    
        
           <div className="pt-5 p-2 mt-5">
            {state && <Grid
                style={{ height: '60vh' }}
                data={state.items}
                onPageChange={pageChange}
                total={state.total}
                skip={state.skip}
                pageable={state.pageable}
                pageSize={state.pageSize}>
                <Column field="booking_id"  title="Booking Id"/>
                <Column field="booking_status" title="Status" />
                <Column field="agent.name" title="Assigned to" />
                <Column field="date"  title="Date of Arr/Dep"/>
                <Column field="time" title="Time of Arr/Dep" />
                <Column field="booking_type" title="Booking Type" />
                <Column cell={MyEditCommandCell} title="Action"  />
            </Grid>}
            </div >
        </div>
        
    );
}

 export default BookingList;
