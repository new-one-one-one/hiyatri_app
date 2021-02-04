import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-default/dist/all.css';
import 'line-awesome/dist/font-awesome-line-awesome/css/all.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../style/style.css';
import 'antd/dist/antd.css';
import { ChakraProvider } from "@chakra-ui/react"


 const  MyApp = ({ Component, pageProps }) =>  {
  return   <ChakraProvider>
  <Component {...pageProps} />
   </ChakraProvider>
}

export default MyApp;
