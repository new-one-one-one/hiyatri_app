import React,{ useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../../actions/auth';

const Admin = ({ children }) => {
    useEffect(() => {
        if (!isAuth()) {
            return Router.push(`/`);
        }
    }, []);
    return <>{children}</>;
};

export default Admin;
