import React from 'react';
import UserAddition from './UserAddition';
import {removeUser} from './../../../actions/user'
import {Button, Table, TableBody, TableCell,TableRow} from '@material-ui/core';
export const UserAdd=({usersList})=>{
    
    const removeU=async(contact) =>{
        const response = await removeUser(contact)
        window.location.reload(false);
    }

    const showUsers= (users)=>{
        return users.map((user)=>{
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
    
    return (
        <div>
            <UserAddition/>
            <div className="usersListposition">
            <Table size='small'>
                <TableBody>
                    <TableRow  component="th" scope="row" padding="none">
                        <TableCell  id="name" scope="row" align="center" padding="none">Name</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Contact Number</TableCell>
                        <TableCell align="center">
                        Actions
                        </TableCell>  
                    </TableRow>
                    {showUsers(usersList)}
                </TableBody>
            </Table>
                
            </div>
            
        </div>
    )
}