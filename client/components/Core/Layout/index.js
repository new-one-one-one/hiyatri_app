import Router from "next/router";
import NProgress from "nprogress";
import Footer from '../Footer'
import dynamic from 'next/dynamic'
const Header = dynamic(() => import('../Header'), {
  ssr: false,
})

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


const Layout = ({ children }) => {

    return (
        <>
        <Header />
         <div className="layout">
        {children}
        </div>
        <Footer />
        </>
    );
};

export default Layout;
