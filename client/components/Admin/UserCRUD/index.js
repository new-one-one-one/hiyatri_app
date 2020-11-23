import UserAddition from './addUser';
import {removeUser} from './../../../actions/user'
import {Button, Table, TableBody, TableCell,TableRow} from '@material-ui/core';

const UserListComponent = ({usersList}) => {

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
        <div className="">
            <UserAddition/>
            <div className="usersListposition">
            <Table size='small'>
                <TableBody>
                    <TableRow  component="th" scope="row" padding="none">
                        <TableCell  id="name" scope="row" align="center" padding="none" style={{color:"white"}}>Name</TableCell>
                        <TableCell align="center" style={{color:"white"}}>Category</TableCell>
                        <TableCell align="center" style={{color:"white"}}>Contact Number</TableCell>
                        <TableCell align="center" style={{color:"white"}}>
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

export default UserListComponent;
