import {removeUser, addUser} from './../../../actions/user';
import {useForm} from 'react-hook-form';
import {TextField, Grid,Select, Paper, DialogActions,DialogContentText,DialogContent,DialogTitle,Divider, FormControl, Typography, Dialog} from '@material-ui/core'
import {Button, Table, TableBody, TableCell,TableRow} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid as Grids, GridColumn as Column } from '@progress/kendo-react-grid';
import { Input } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';




const UserListComponent = ({usersList, reload}) => {
    const [user, setUser] = useState("ADMIN");
    const {handleSubmit, errors, register, reset} = useForm()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [state, setState] = useState();
    const [open, setOpen]=useState(false);
    const [acted,setAction] = useState("");

    
    const createState = (skip, take) => {
      return {
        items: usersList && usersList.slice(skip, skip + take),
        total: usersList && usersList.length,
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
       
      // not reloading properly on deletion so this is used 
      useEffect(()=>{

      },[state])

       useEffect(() => {
            setState(createState(0, 10))
       },[usersList])

       useEffect(()=>{

       },[register, open])


      const pageChange = (event) => {
          setState(createState(event.page.skip, event.page.take));
      }




    const handleChange = (event) => {
        setUser(event.target.value);
    };
    const formSubmit=(data)=>{
        addUser(data);
        reload();
        reset();
        setOpen(true)
        setAction("add")
        setOpen(true)
    }
    const removeU = (who)=>{
        removeUser(who);
        reload();
        setAction("delete")
        setOpen(true)
    }


    const EditCommandCell = props => {
        return (
            <td>
                <Button
                    variant="contained"
                    id="user-booking-list-btn"
                    onClick={()=>removeU(props.dataItem)}>
                    Delete
                </Button>
            </td>
        );
    };

    const MyEditCommandCell = props => (
              <EditCommandCell {...props} />
          );



  const AddUser = () => {
    return  matches?(<div className="rootUserList">
               <Paper elevation={3} className="containerUserAdd">
                <div className="fieldsUserAdd">
                    <form onSubmit={handleSubmit(formSubmit)}>
                    <Box display="flex" p={0}>
                        <Box p={2} width="20%">
                            <TextField
                                variant="outlined"
                                id="input-fixed-height"
                                name="phone_number"
                                label="Phone Number"
                                type="number"
                                inputRef={register({pattern: /^\d+$/,required: true , minLength:10, maxLength:10})}
                                onInput={(e)=>{ if(e.target.value.length>0)e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                                error={errors.phone_number ?true:false}
                                helperText={errors.phone_number? "Invalid":""}
                                fullWidth
                                />
                        </Box>
                        <Box width="20%" p={2}>
                            <TextField
                                id="input-fixed-height"
                                variant="outlined"
                                name="name"
                                label="User name"
                                inputRef={register({required: true , minLength:1})}
                                error={errors.name?true:false}
                                helperText={errors.name?"Required":""}
                            />

                        </Box>
                        <Box width="20%" p={2}>
                            <Select
                                className="pl-1"
                                variant="outlined"
                                style={{height:"55px", borderRadius:"20px", width:"150px"}}
                                value={user}
                                native
                                id="dropdown-text"
                                name="user_type"
                                onChange={handleChange}
                                inputRef={register({required:true})}>
                                    <option value="">None</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="AGENT">Agent</option>
                                </Select>
                            {(errors.user_type)&&(<p style={{color:"red"}}>Select Role</p>)}
                        </Box>
                        <Box width="20%" p={2}>
                            <Button type="Submit"  className="buttonUserAdd" variant="contained" size="large">
                                Add User
                            </Button>
                        </Box>
                    </Box>


                    </form>
                </div>
               </Paper>
            </div>):(
                <div className="rootUserList">
                     <form onSubmit={handleSubmit(formSubmit)}>
                     <br/>
                             <TextField
                                 variant="outlined"
                                 id="input-fixed-height"
                                 name="phone_number"
                                 label="Phone Number"
                                 inputRef={register({pattern: /^\d+$/,required: true , minLength:10, maxLength:10})}
                                 onInput={(e)=>{ if(e.target.value.length>0)e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                                 error={errors.phone_number ?true:false}
                                 helperText={errors.phone_number? "Invalid":""}
                                 />

                                <br/>
                                <br/>
                             <TextField
                                 id="input-fixed-height"
                                 variant="outlined"
                                 name="name"
                                 label="User name"
                                 inputRef={register({required: true , minLength:1})}
                                 error={errors.name?true:false}
                                 helperText={errors.name?"Required":""}
                             />
                             <br/>
                             <br/>


                             <Select
                                 className="pl-1"
                                 variant="outlined"
                                 style={{height:"55px", borderRadius:"20px", width:"222px"}}
                                 value={user}
                                 native
                                 id="dropdown-text"
                                 name="user_type"
                                 onChange={handleChange}
                                 inputRef={register({required:true})}>
                                     <option value="">None</option>
                                     <option value="ADMIN">Admin</option>
                                     <option value="AGENT">Agent</option>
                                 </Select>
                             {(errors.user_type)&&(<p style={{color:"red"}}>Select Role</p>)}
                             <br/>
                             <br/>
                             <Button type="Submit" onClick={()=>setOpen(true)}  className="buttonUserAdd" style={{width:"222px"}}  variant="contained" size="large">
                                 Add User
                             </Button>

                             <br/>
                             <br/>
                             <br/>



                     </form>
                 </div>
            )
  }
  

    const messageOnAction=(msg, type)=>{
        return (
           <div>
            <Dialog open={open}  aria-labelledby="customized-dialog-title" aria-labelledby="customized-dialog-title">
          
            <Box style={{position:"absolute", top:"4px", right:"4px"}} >
                      <IconButton size="small" aria-label="close"  onClick={ () => setOpen(false)}>
                        <CloseIcon style={{width:"16px", height:"16px"}}  />
                        </IconButton>
                </Box>
          <DialogContent>
          <Box display={"flex"} p={3}>
            <div className="text-center">
            <font className="cm-title"><h4><b>{type} Confirmation</b></h4>       
            </font>
                
        <small>  <h6 className="on-cancellation">User has been {msg}!</h6></small>
                <Box display="flex" p={1}>
                 <Box width="38%" p={1}>
                 </Box>
                 <Box p={1}>
                  <Button variant="contained" id="yes-btn"  onClick={()=>{setOpen(false)}}>CLOSE</Button>
                 </Box>     
                </Box>
                  
            </div>
            </Box>
          </DialogContent>
        </Dialog>
        </div> 
            
        )
    }

     useEffect(()=>{
        if(Object.keys(errors).length !== 0)
            {
                setAction("")
            }
     }, [errors])
    return (
        <div className="">
        {AddUser()}
        <div className="usersListposition">
        <div className="">
            {state && <Grids
                style={{ height: '60vh' }}
                data={state.items}
                onPageChange={pageChange}
                total={state.total}
                skip={state.skip}
                pageable={state.pageable}
                pageSize={state.pageSize}>
                <Column field="name"  title="User Name"/>
                <Column field="user_type" title="Role" />
                <Column field="phone_number" title="Phone Number" />
                <Column cell={MyEditCommandCell} title="Action"  />
            </Grids>}
        </div >
        
        {Object.keys(errors).length === 0 && acted!="" &&(acted!="add"?messageOnAction("deleted succesfully", "Deletion"):messageOnAction("added successfully","Addition"))}
        </div>
        </div>
    )
}

export default UserListComponent;
