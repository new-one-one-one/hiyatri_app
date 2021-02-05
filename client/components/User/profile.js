import {singleUser, updateProfile} from './../../actions/user';
import { getCookie, isAuth } from "../../actions/auth";
import { useState, useEffect } from 'react';
import {TextField} from '@material-ui/core'
import { Button, Grid } from '@material-ui/core';
import { Paper, Box } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";


const UserProfile = () =>{
    const theme = useTheme();
    const token = getCookie('token');
     const [user , setUserDetails] = useState(null)
     const [isEditing, setEdit] = useState(false);
     const matches = useMediaQuery(theme.breakpoints.up("md"));

    useEffect(()=>{  
        singleUser(isAuth() && isAuth()._id, token)
            .then(data => {
                // console.log(data)
                setUserDetails(data.result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
      
        
    const handleNameChange = (e) =>{
        setUserDetails({...user, name:e.target.value})
    }
    const handleEmailChange = (e) =>{
        setUserDetails({...user, email:e.target.value})
    }
    const sumbitChanges = () =>{
        updateProfile({id:isAuth()._id,name:user.name, email:user.email}, token)
        setEdit(false)
    }
  
    const userDisplay = () =>{
        return <>
            <TextField 
                value={isAuth() && isAuth().phone_number} 
                label="Phone number"
                disabled={true} 
                variant="outlined"
            />
            <br></br>
            <br></br>

            <TextField 
                disabled={!isEditing}
                value={user.name} 
                label="User Name" 
                variant="outlined"
                onChange={handleNameChange}
            />
            <br></br>
            <br></br>
            <TextField 
                disabled={!isEditing}
                value={user.email} 
                label="email"
                placeholder="enter email" 
                variant="outlined"
                onChange={handleEmailChange}
            />  
            <br></br>
            <br></br>
            <Button hidden={isEditing} onClick={()=> setEdit(true)} variant="contained" className="bd-btn-agent">Edit Profile</Button>
            <Button onClick={sumbitChanges}  variant="contained" className="bd-btn-agent"  hidden={!isEditing}>UPDATE</Button>
           
        </>
    }


    if(user){
        return (
                <div style={{paddingTop:"100px", paddingLeft:"10%", paddingRight:"10%"}}>
                    <h3>My Profile</h3>
                    <Divider style={{width:"150px"}}/>
                    <Divider style={{width:"150px"}}/>
                    {matches?
                       (<Box display={"flex"}>
                         <Box width="40%">
                            <img style={{borderRadius:"50%", minHeight:"20%", minWidth:"350px",maxHeight:"350px"}} src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                         </Box>
                         <Box width="40%">
                         {userDisplay()}
                         </Box>
                       </Box>):(
                       <div>
                        <Box display={"flex"}>
                         <Box width="100%">
                            <img style={{paddingRight:"5%",borderRadius:"50%", minHeight:"20%", minWidth:"350px",maxHeight:"350px"}} src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                         </Box>
                       </Box>
                        <br></br>
                        <div style={{marginLeft:"25%"}}>
                         {userDisplay()}
                         </div>
                        </div>
                      )}   
                    
            </div>
        )
    }
    else{
        return <> <h1>Loading</h1> </>
    }

   

}
export default UserProfile