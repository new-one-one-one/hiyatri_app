import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import {agent_list} from './../../../actions/order';
import { getCookie } from '../../../actions/auth';
import {Box, MenuItem, Typography,Select, FormControl, Button, makeStyles, Divider} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import { CSVLink, CSVDownload } from "react-csv";


import { Icon } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingLeft:"10%",
      paddingRight:"12%",
      marginTop:"50px",
    },
    tabStyle:{
      color:"#000066" ,
      fontWeight:"bold"
    },
    disableStyle:{
      color:"red" ,
      fontWeight:"bold"
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
    table: {
      minWidth: 500,
    },
    tr :{
      height: 10
    }


  }));





const EditCommandCell = props => {
    return (
        <td>
            <button
                id="design-admin-list"
                onClick={() => Router.push(`/admin/booking/detail/${props.dataItem._id}`)}>
                View Details
            </button>
        </td>
    );
};


const BookingList = ({ list }) => {
    const classes = useStyles();
  const [state, setState] = useState();
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
  const FilterBooking = () => {
     return <div style={{ width: '100%' }}>

      <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={1} width="20%">
              <Typography variant="body2"> <FilterListIcon />
              Filter </Typography>
          </Box>
          <Box p={1} width="45%">
           <FormControl className={classes.formControl}>
              <Typography variant="body2">
                  <span style={{color:"grey", fontSize:"15px"}}>Booking Type: </span>
                  <Select value={booking_type}  displayEmpty style={{width:"100px"}} disableUnderline  className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>
                      <MenuItem value="" disabled>
                      Select
                      </MenuItem>
                      <MenuItem value="All"> <button className="filter-option" onClick={()=>setBooking("All")} >All</button>  </MenuItem>
                      <MenuItem value="Arrival"><button className="filter-option" onClick={()=>setBooking("Arrival")} >Arrival</button></MenuItem>
                      <MenuItem value="Departure"> <button className="filter-option" onClick={()=>setBooking("Departure")} >Departure</button></MenuItem>
                  </Select>
              </Typography>

              </FormControl>

          </Box>
          <Box p={1} width="50%">
              <FormControl className={classes.formControl}>
              <Typography variant="body2">

              <span style={{color:"grey", fontSize:"15px"}}>Status:  </span>
              <Select value={filter_type}
               displayEmpty
               style={{width:"200px", fontSize:"2ex"}}
               disableUnderline inputProps={{ 'aria-label': 'Without label' }}
               >
                  <MenuItem value="" disabled>Booking Status</MenuItem>
                  <MenuItem value="DISPLAY_All"><button className="filter-option" onClick={()=>filterData("DISPLAY_All")} >All</button>    </MenuItem>
                  <MenuItem value="COMPLETED"><button className="filter-option" onClick={()=>filterData("COMPLETED")} >COMPLETED</button></MenuItem>
                  <MenuItem value="IN_PROGRESS"><button className="filter-option" onClick={()=>filterData("IN_PROGRESS")}>IN PROGRESS</button></MenuItem>
                  <MenuItem value="NO_SHOW"><button className="filter-option" onClick={()=>filterData("NO_SHOW")}>NO SHOW</button></MenuItem>
                  <MenuItem value="ASSIGN_TO_AGENT"> <button className="filter-option" onClick={()=>filterData("ASSIGN_TO_AGENT")} >ASSIGNED TO AGENT</button></MenuItem>
                  <MenuItem value="ASSIGN_TO_ADMIN"><button className="filter-option" onClick={()=>filterData("ASSIGN_TO_ADMIN")}>ASSIGN TO ADMIN</button></MenuItem>
                  <MenuItem value="CANCELLED_BY_ADMIN"><button className="filter-option" onClick={()=>filterData("CANCELLED_BY_ADMIN")}>CANCELLED(by admin)</button></MenuItem>
                  <MenuItem value="CANCELLED_BY_AGENT"><button className="filter-option" onClick={()=>filterData("CANCELLED_BY_AGENT")}>CANCELLED(by agent)</button></MenuItem>
                  <MenuItem value="CANCELLED_BY_USER"><button className="filter-option" onClick={()=>filterData("CANCELLED_BY_USER")}>CANCELLED(by user)</button></MenuItem>

              </Select>
              </Typography>

              </FormControl>
          </Box>

          <Box p={1} width="60%">
          <FormControl className={classes.formControl}>
              <Typography variant="body2">
              <span style={{color:"grey", fontSize:"15px"}}>Assinged To : </span>
              <Select value={agent_name}  displayEmpty style={{width:"200px"}} disableUnderline  className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="All_AGENTS">
                  <button className="filter-option" onClick={()=>setAgent("All_AGENTS")} >
                      All Agents
                  </button>
              </MenuItem>
                  {(all_agents) && all_agents.map(element => {
                      return <MenuItem value={element.phone_number} >
                                  <button className="filter-option" onClick={()=>setAgent(element.phone_number)} >
                                      {element.name} ({element.phone_number})
                                  </button>
                              </MenuItem>
                  })}
              </Select>
              </Typography>

              </FormControl>

          </Box>
          <Box p={1} width="20%">
              <button id="design-admin-list" onClick={()=>{filterData("DISPLAY_All", setBooking("All"), setAgent("All_AGENTS"))}}>Clear Filter</button>
          </Box>

      </Box>
  </div>
  }

console.log(state, list)

    return (
        <div>
           <div  className="container-fluid pt-1">
           <br></br>
            <h2 className="booking-list-head">REQUESTS</h2>
            <div className="container-fluid">
            {state && <CSVLink  data={state && state.items || []} separator={";"} filename="booking_list.csv">
                       <Button variant="contained" className="export-btn">
                       Export as CSV
                       </Button>
                     </CSVLink>}
            </div>
            <br></br>
            <Divider />
              {FilterBooking()}
            <Divider/>
            <br></br>
            <br></br>
            {state && <Grid
                style={{ height: '75vh' }}
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
