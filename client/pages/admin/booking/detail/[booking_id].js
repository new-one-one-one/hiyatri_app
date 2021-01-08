import { useEffect, useState } from 'react';
import { getCookie } from '../../../../actions/auth';
import BookingPage from '../../../../components/Admin/Booking/bookingDetail';
import Layout from '../../../../components/Core/Layout';
import { single_order } from '../../../../actions/order';
import { withRouter } from 'next/router'
import Admin from '../../../../components/Core/Protect/admin'


const BookingDetail = ({ router }) => {
  const [data, setData] = useState();
  const [reload, setReload] = useState(null);
  const token = getCookie('token');

  useEffect(() => {
     single_order(router.query.booking_id,token)
      .then(response => {
         setData(response)
      })
      .catch((err) => {
        console.log(err)
      })
  },[router,reload])

console.log(reload)
 return <>
         <Admin>
          <Layout>
            {data && data.response && <BookingPage data={data.response} reloadData={(reloads) => setReload(!reloads)}/>}
          </Layout>
         </Admin>
        </>
}

export default withRouter(BookingDetail);
