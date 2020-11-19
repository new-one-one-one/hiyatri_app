import React,{ useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

const SUPER_ADMIN = ({ children }) => {
    useEffect(() => {
        if (!isAuth() && isAuth().user_type === "SUPER_ADMIN") {
            Router.push(`/`);
        }
    }, []);
    return <>{children}</>;
};

export default SUPER_ADMIN;
