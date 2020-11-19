import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {addUser} from '../../../actions/user'
import {TextField, Grid, MenuItem, Paper, FormControl, Button, Typography, Dialog} from '@material-ui/core'
import {DialogTitle,DialogActions,DialogContent,DialogContentText} from '@material-ui/core'
const ListofUser = ()=>{ 
    const [user, setUser] = useState("admin");
    const {handleSubmit, errors, register} = useForm()
    const handleChange = (event) => {
        setUser(event.target.value);
      };
    const formSubmit= async(data)=>{
        const {status} = await addUser(data);
        alert(status);
        window.location.reload(false);
    }
    
   return (
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
                        InputLabelProps={{style:{fontSize:20}}}

                        helperText={errors.phone_number? "Phone number is Invalid":""}

                    />
                        </Grid>
                    <Grid item xs={3}>
                        <TextField 
                            name="name" label="User Name"
                            variant="outlined" 
                            inputRef={register({required: true , minLength:1})} 
                            inputProps={{maxLength:20, style:{fontSize:20}}}
                            error={errors.name?true:false}
                            InputLabelProps={{style:{fontSize:20}}}
                            helperText={errors.name?"Please Enter the name":""}
                        />
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                        <select className="dropdownStyle"
                            fullWidth
                            value={user}
                            name="user_type"
                            onChange={handleChange}
                            ref={register({required:true})}
                            >
                            <option value="">None</option>
                            <option value="admin">Admin</option>
                            <option value="agent">Agent</option>
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
                {/* <Dialog
                    open={exists_status==="exists"?true:false}
                    onClose={()=>setStatus("")}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"User Already Exists !"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This user has already been registered
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setStatus("")} color="primary" variant="contained">Okay</Button>
                    </DialogActions>
                </Dialog>       */}

            </div>
           </Paper>
       
       </div>
   )   
}
export default ListofUser