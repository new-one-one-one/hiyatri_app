import { useEffect, useState } from 'react';
import Layout from '../../components/Core/Layout';
import UserListComponent from '../../components/Admin/UserCRUD';
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
           {head()}
            <Admin>
              <Layout>
                <UserListComponent usersList={usersList} />
              </Layout>
            </Admin>
           </>
}

export default UserCRUD;
