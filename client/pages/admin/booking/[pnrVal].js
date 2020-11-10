import { getBooking } from './../../../actions/booking';
import {useRouter} from 'next/router';
import AdminPage from './../../../components/Admin';
import Layout from '../../../components/Core/Layout';
import { Button } from '@material-ui/core';
import React from 'react';


const BookingFetch = (res) => {
    if( res!==undefined&& Object.keys(res).length!==0 ){
      return <Layout>
                <AdminPage requestedPnr={res} cmnts={res[1]}/>
             </Layout>
    }
    else{
        return <>
                <h1>Still loading</h1>
               </>
    }

}
BookingFetch.getInitialProps=async({query})=>{
    return {
      res: await getBooking(query.pnrVal)
    }
}

export default BookingFetch;
































// import { getBooking } from './../../../actions/booking';
// import {useRouter} from 'next/router';
// import AdminPage from './../../../components/Admin';
// import React from 'react';
// import { Button } from '@material-ui/core';

// const bookingFetch = () => {
//     const router = useRouter();
//     const {pnrVal}=router.query;
//     const [res, setResult] = React.useState(Object)
//  const getDetails= async(pnr) =>{
//     getBooking(pnr)
//         .then(result => {
//             setResult(prevDetails => ({
//                 ...prevDetails,  res : result
//               }));
//         })
//         .catch(err=>{console.log(err)});
//  }
//  if(Object.keys(res).length!==0 && res!==undefined){
//      console.log(res, "This is res");
//   return <>
//            <AdminPage requestedPnr={res} />
//          </>
//  }
//  else{
//      return <>
//                 <Button style={{marginTop:"40%", marginLeft:"30%"}}
//                 size="large" color="primary"
//                 variant="contained"
//                 onClick={() => getDetails(pnrVal)}>Request details</Button>
//             </>
//  }

// }

// export default bookingFetch;
