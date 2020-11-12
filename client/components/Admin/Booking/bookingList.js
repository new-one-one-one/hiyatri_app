import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import products from './products.json';
import {Tab, Divider, FormControl, Select,MenuItem,Typography, Box, Button} from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@material-ui/core';


const EditCommandCell = props => {
    return (
        <td>
            <button
                className="k-button k-primary"
                onClick={() =>  console.log(props)}>
                Edit
      </button>
        </td>
    );
};

const FilterBar = () => {
  <TabContext>
           <TabList>
             <Tab label="Pending"  value="1" />
             <Tab label="Completed"  value="2" />
           </TabList>
           <div style={{ width: '100%' }}>
             <Box display="flex" p={1} bgcolor="background.paper">
                 <Box p={1} width="20%">
                 <Typography variant="body2"> <FilterListIcon />  Filter </Typography>
                 </Box>
                 <Box p={1} width="45%">
                 <FormControl >
                     <Typography variant="body2">
                     <span style={{color:"grey"}}>Booking Type: </span>
                     <Select value={""}  displayEmpty style={{width:"100px"}} disableUnderline    inputProps={{ 'aria-label': 'Without label' }}>                  <MenuItem value="" disabled>
                        Select
                     </MenuItem>
                     <MenuItem value="Arrival">Arrival</MenuItem>
                     <MenuItem value="Departure">Departure</MenuItem>
                     </Select>
                     </Typography>

                     </FormControl>

                 </Box>
                 <Box p={1} width="40%">
                     <FormControl >
                     <Typography variant="body2">
                     <span style={{color:"grey"}}>Status:  </span>
                     <Select value={""}  displayEmpty style={{width:"180px"}} disableUnderline    inputProps={{ 'aria-label': 'Without label' }}>                  <MenuItem value="" disabled>
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
                   <FormControl>
                     <Typography variant="body2">
                     <span style={{color:"grey"}}>Assinged To : </span>
                     <Select value={""}  displayEmpty style={{width:"100px"}} disableUnderline    inputProps={{ 'aria-label': 'Without label' }}>                  <MenuItem value="" disabled>
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
  </TabContext>
}


class BookingList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.createState(0, 10);
        this.pageChange = this.pageChange.bind(this);
     }
    pageChange(event) {
      console.log(event.page)
        this.setState(this.createState(event.page.skip, event.page.take));
    }
    createState(skip, take) {
        return {
            items: products.slice(skip, skip + take),
            total: products.length,
            skip: skip,
            pageSize: take,
            pageable: this.state ? this.state.pageable : {
                buttonCount: 5,
                info: false,
                type: 'numeric',
                pageSizes: true,
                previousNext: false
            }
        };
    }
    MyEditCommandCell = props => (
            <EditCommandCell {...props}  enterEdit={this.enterEdit}  />
        );

    render() {
        return (
            <div className="p-5">
                <FilterBar />
                <Grid
                    style={{ height: '60vh' }}
                    data={this.state.items}
                    onPageChange={this.pageChange}
                    total={this.state.total}
                    skip={this.state.skip}
                    pageable={this.state.pageable}
                    pageSize={this.state.pageSize}>
                    <Column field="ProductID"  title="Booking Id"/>
                    <Column field="ProductName" title="Status" />
                    <Column field="UnitPrice" title="Assigned to" />
                    <Column field="ProductID"  title="Date of Arr/Dep"/>
                    <Column field="ProductName" title="Time of Arr/Dep" />
                    <Column field="UnitPrice" title="Booking Type" />
                    <Column field="UnitPrice" title="Action" />
                    <Column cell={this.MyEditCommandCell} />
                </Grid>
            </div >
        );
    }
}

 export default BookingList;
