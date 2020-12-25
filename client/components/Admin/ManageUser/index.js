import {removeUser, addUser} from './../../../actions/user';
import {useForm} from 'react-hook-form';
import {TextField, Grid, Paper, FormControl, Typography, Dialog} from '@material-ui/core'
import {Button, Table, TableBody, TableCell,TableRow} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Grid as Grids, GridColumn as Column } from '@progress/kendo-react-grid';




const UserListComponent = ({usersList, reload}) => {
    const [user, setUser] = useState("ADMIN");
    const {handleSubmit, errors, register, reset} = useForm()

    const [state, setState] = useState();
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

       useEffect(() => {
            setState(createState(0, 10))
       },[usersList])


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
    }
    const removeU = (who)=>{
        removeUser(who);
        reload();
    }


    const EditCommandCell = props => {
        return (
            <td>
                <Button
                    size="small"
                    className="delete-user"
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
    return         <div className="rootUserList">
               <Paper elevation={3} className="containerUserAdd">
                <div className="fieldsUserAdd">
                    <form onSubmit={handleSubmit(formSubmit)}>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                name="phone_number"  type="text"  id="outlined-basic"
                                label="Phone Number" variant="outlined"
                                inputRef={register({ pattern: /^\d+$/,required: true, minLength:10})}
                                inputProps={{maxLength:10, style:{fontSize:20}}}
                                error={errors.phone_number ?true:false}
                                size="small"
                                InputLabelProps={{style:{fontSize:15,padding:"7px 0px 0px 0px"}}}

                                helperText={errors.phone_number? "Phone number is Invalid":""}

                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                name="name" label="User Name"
                                variant="outlined"
                                size="small"
                                inputRef={register({required: true , minLength:1})}
                                inputProps={{maxLength:20, style:{fontSize:20}}}
                                error={errors.name?true:false}
                                InputLabelProps={{style:{fontSize:15,padding:"7px 0px 0px 0px"}}}
                                helperText={errors.name?"Please Enter the name":""}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth variant="outlined">
                                <select className="dropdownStyle"
                                    value={user}
                                    size="small"
                                    name="user_type"
                                    onChange={handleChange}
                                    ref={register({required:true})}>
                                    <option value="">None</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="AGENT">Agent</option>
                                </select>
                            </FormControl>
                            {(errors.user_type)&&(<p style={{color:"red"}}>Please select user</p>)}
                        </Grid>
                        <Grid item xs={3}>
                        <Typography align="center">
                            <Button type="Submit"   className="buttonUserAdd" variant="contained" size="large" color="primary">
                                Add User
                            </Button>
                        </Typography>
                        </Grid>
                    </Grid>

                    </form>
                </div>
               </Paper>
            </div>
  }


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
                <Column field="name"  title="Name"/>
                <Column field="user_type" title="Category" />
                <Column field="phone_number" title="Contact Number" />
                <Column cell={MyEditCommandCell} title="Action"  />
            </Grids>}
        </div >
        </div>
        </div>
    )
}

export default UserListComponent;
