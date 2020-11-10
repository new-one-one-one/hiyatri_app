import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Tab, Divider, FormControl, Select,MenuItem,Typography, Box, Button} from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@material-ui/core';




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




const  LabTabs = ({data}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
    const handleChange =  async(event, newValue) => {
        setValue(newValue);
    };  
  return (
    <div className={classes.root}>
    <h1>REQUESTS</h1>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label="Pending" className={classes.tabStyle} value="1" />
            <Tab label="Completed" className={classes.tabStyle} value="2" />
          </TabList>
          <Divider />
          <div style={{ width: '100%' }}>
            <Box display="flex" p={1} bgcolor="background.paper">
                <Box p={1} width="20%">
                <Typography variant="body2"> <FilterListIcon />  Filter </Typography>
                </Box>
                <Box p={1} width="45%">
                <FormControl className={classes.formControl}>
                    <Typography variant="body2">
                    <span style={{color:"grey"}}>Booking Type: </span>
                    <Select value={""}  displayEmpty style={{width:"100px"}} disableUnderline  className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>                  <MenuItem value="" disabled>
                       Select
                    </MenuItem>
                    <MenuItem value="Arrival">Arrival</MenuItem>
                    <MenuItem value="Departure">Departure</MenuItem>
                    </Select>
                    </Typography>
                    
                    </FormControl>

                </Box>
                <Box p={1} width="40%">
                    <FormControl className={classes.formControl}>
                    <Typography variant="body2">
                    
                    <span style={{color:"grey"}}>Status:  </span>
                    <Select value={""}  displayEmpty style={{width:"180px"}} disableUnderline  className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>                  <MenuItem value="" disabled>
                       Assigned To Admin
                    </MenuItem>
                    <MenuItem value="Agent1">Agent1</MenuItem>
                    <MenuItem value="Agent2">Agent2</MenuItem>
                    <MenuItem value="Agent3">Agent3</MenuItem>
                    </Select>
                    </Typography>
                    
                    </FormControl>
                </Box>
                
                <Box p={1} width="40%">
                <FormControl className={classes.formControl}>
                    <Typography variant="body2">
                    <span style={{color:"grey"}}>Assinged To : </span>
                    <Select value={""}  displayEmpty style={{width:"100px"}} disableUnderline  className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>                  <MenuItem value="" disabled>
                       Agent Name
                    </MenuItem>
                    <MenuItem value="Agent12">Agent12</MenuItem>
                    <MenuItem value="Agent12">Agent123</MenuItem>
                    </Select>
                    </Typography>
                    
                    </FormControl>

                </Box>
                <Box p={1} width="20%">
                    <Button style={{'color':"aqua"}}><b>Clear Filter</b></Button>
                </Box>
                
            </Box>
        </div> 
        <Divider />

        <TabPanel value="1">
   {/* Data show */}
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableBody>
          <TableRow>
              <TableCell  component="th" style={{ width: 160, height:"80px", color:"white" }} align="center">
                    Booking Id
              </TableCell>
              <TableCell  component="th" style={{ width: 160 , color:"white"}} align="center">
                    Status
              </TableCell>
              <TableCell  component="th" style={{ width: 160 , color:"white"}} align="center">
                    Assigned To
              </TableCell>
              <TableCell  component="th" style={{ width: 160 , color:"white"}} align="center">
              Date
              </TableCell>
              <TableCell  component="th" style={{ width: 160 , color:"white"}} align="center">
                   Time OF Arr/Dep
              </TableCell>
              <TableCell  component="th" style={{ width: 160 , color:"white"}} align="center">
                    Booking Type
              </TableCell>
              <TableCell  component="th" style={{ width: 160 , color:"white"}} align="center">
                    Actions
              </TableCell>
              
          </TableRow>  
          
          {data && data.map((row) => (
            <TableRow key={row._id} >  
              <TableCell  style={{ width: 160 }}  align="center">
                {row._id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Don't know
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Yet to decide
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.booking_information.reservation_upto.date}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.booking_information.reservation_upto.time}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                Arrival
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
          <Button href={'/admin/booking/' + `${row.pnr_number}`} style={{color:"aqua"}}><b>Show details</b></Button>
              </TableCell>
            </TableRow>
          ))}

         
        </TableBody>
      
      </Table>
    </TableContainer>
        </TabPanel>
        <TabPanel value="2">Completed</TabPanel>
      </TabContext>
      
    </div>
  );
}
export default LabTabs;


