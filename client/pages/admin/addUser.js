import Layout from '../../components/Core/Layout';
import React from 'react';
import {UserAdd}  from './../../components/Admin/userFunctionality';
import {getUsers} from './../../actions/user';

const UserFunctionality=({usersList})=>{
    return <>
        <Layout>
            <UserAdd usersList={usersList}/>
        </Layout>    
    </>
}

export async function getStaticProps(){
    return {
        props: {"usersList": await getUsers()}, 
      }
    }
    


export default UserFunctionality;