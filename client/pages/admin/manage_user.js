import { useEffect, useState } from 'react';
import Layout from '../../components/Core/Layout';
import UserListComponent from '../../components/Admin/ManageUser';
import { getUsers } from '../../actions/user';
import { getCookie } from '../../actions/auth';
import Admin from '../../components/Core/Protect/admin'
import Head from 'next/head';

const head = () => (
      <Head>
          <title>
             {"Manage Users"} | {process.env.NEXT_PUBLIC_APP_NAME}
          </title>
       </Head>
  );

const UserCRUD = () => {
    const [usersList, setUsersList] = useState([]);
    const [reloadData , setReload] = useState(false);

    const token = getCookie('token');
     useEffect(() => {
        getUsers(token)
         .then(response => {
            setUsersList(response)
         })
         .catch((err) => {
           console.log(err)
         })
     },[reloadData])

    const handleReload = () =>{
      setReload(!reloadData);

    }

    return <>
           {head()}
            <Admin>
              <Layout>
                <UserListComponent usersList={usersList} reload={handleReload} />
              </Layout>
            </Admin>
           </>
}

export default UserCRUD;
