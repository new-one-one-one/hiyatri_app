import BookingPage from '../../../../components/Admin/Booking/bookingDetail';
import Layout from '../../../../components/Core/Layout';
import { single_order } from '../../../../actions/order';
import { withRouter } from 'next/router';

const BookingDetail = ({ data }) => {
 return <Layout>
            <BookingPage data={data} />
        </Layout>
}

BookingDetail.getInitialProps = ({ query }) => {
    return  single_order(query.booking_id)
    .then(data => {
       return { data, query}
    })
    .catch(err => {
       return console.log(err)
    })
}

export default withRouter(BookingDetail);
































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
