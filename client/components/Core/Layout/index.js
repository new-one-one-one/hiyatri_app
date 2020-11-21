import Router from "next/router";
import NProgress from "nprogress";
import Header from '../Header';
import Footer from '../Footer'

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


const Layout = ({ children }) => {

    return (
        <>
        <Header />
        {children}
        <Footer />
        </>
    );
};

export default Layout;
