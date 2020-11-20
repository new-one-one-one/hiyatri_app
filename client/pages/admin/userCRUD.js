import { useEffect, useState } from 'react';
import Layout from '../../components/Core/Layout';
import UserListComponent from '../../components/Admin/UserCRUD';
import { getUsers } from '../../actions/user';
import { getCookie } from '../../actions/auth';
import Admin from '../../components/Core/Protect/admin'

const UserCRUD = () => {
    const [usersList, setUsersList] = useState([]);
    const token = getCookie('token');

     useEffect(() => {
        getUsers(token)
         .then(response => {
            setUsersList(response)
         })
         .catch((err) => {
           console.log(err)
         })
     },[])

    return <>
            <Admin>
              <Layout>
                <UserListComponent usersList={usersList} />
              </Layout>
            </Admin>
           </>
}

export default UserCRUD;
