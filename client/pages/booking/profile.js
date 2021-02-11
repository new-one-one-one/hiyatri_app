import Profile from '../../components/User/profile';
import Layout from '../../components/Core/Layout';
import Private from '../../components/Core/Protect/private';
import { isAuth , getCookie } from "./../../actions/auth";
import { useEffect, useState } from 'react';
import { singleUser } from '../../actions/user';


const token = getCookie('token');

const UserProfile = () =>{
     return <>
           <Private>
             <Layout>
               <Profile/>
             </Layout>
           </Private>
        </>
}     
  




export default UserProfile;