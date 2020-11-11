import BookingPage from './../../../components/Admin/BookingDetail';
import Layout from '../../../components/Core/Layout';

const BookingDetail = () => {
 return <Layout>
            <BookingPage />
        </Layout>
}

export default BookingDetail;
































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
