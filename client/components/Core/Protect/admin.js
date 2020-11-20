import React,{ useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../../actions/auth';

const Admin = ({ children }) => {
    useEffect(() => {
        if (!isAuth()) {
            return Router.push(`/`);
        }
        if(isAuth() && !(isAuth().user_type === "Admin" || isAuth().user_type ==="SUPER_ADMIN")){
             Router.push(`/`);
        }
    }, []);
    return <>{children}</>;
};

export default Admin;
