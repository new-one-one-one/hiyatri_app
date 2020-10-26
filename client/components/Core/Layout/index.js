import Router from "next/router";
import NProgress from "nprogress";
import Header from '../header';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


const Layout = ({ children }) => {

    return (
        <>
        <Header />
        {children}
        </>
    );
};

export default Layout;
