import {removeUser, addUser} from './../../../actions/user';
import {useForm} from 'react-hook-form';
import {TextField, Grid, Paper, FormControl, Typography, Dialog} from '@material-ui/core'
import {Button, Table, TableBody, TableCell,TableRow} from '@material-ui/core';
import { useEffect, useState } from 'react';

const UserListComponent = ({usersList, reload}) => {
    const [user, setUser] = useState("ADMIN");
    const {handleSubmit, errors, register, reset} = useForm()
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
 
    const showUsers= ()=>{
        if(usersList!==[]){
        return usersList.map((user)=>{
            return (
            <TableRow hover tabIndex={-1} key={user.phone_number}>
                <TableCell id={user.phone_number} scope="row" align="center" padding="none">
                {user.name}
                </TableCell>
                <TableCell align="center">{user.user_type}</TableCell>
                <TableCell align="center">{user.phone_number}</TableCell>
                <TableCell align="center">
                    <Button variant="contained"  color="secondary" onClick={()=>removeU(user)}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
                  );
            })
        }

    }
    
    return (
        <div className="">
        <div className="rootUserList">
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

        <div className="usersListposition">
            <Table size='small'>
                <TableBody>
                    <TableRow  component="th" scope="row" padding="none">
                        <TableCell  id="name" scope="row" align="center" padding="none" style={{color:"white"}}>Name</TableCell>
                        <TableCell align="center" style={{color:"white"}}>Category</TableCell>
                        <TableCell align="center" style={{color:"white"}}>Contact Number</TableCell>
                        <TableCell align="center" style={{color:"white"}}>Actions</TableCell>
                    </TableRow>
                    {showUsers()}
                </TableBody>
            </Table>
        </div>
        </div>
    )
}

export default UserListComponent;
