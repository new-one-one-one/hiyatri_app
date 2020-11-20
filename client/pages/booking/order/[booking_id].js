import { useEffect, useState } from 'react';
import { getCookie } from '../../../actions/auth';
import Layout from '../../../components/Core/Layout';
import Private from '../../../components/Core/Protect/private';
import { withRouter } from 'next/router';
import Order from '../../../components/Order';
import { get_booking_by_id } from '../../../actions/booking';

const FinalOrder = ({ router }) => {
  const [data, setData] = useState();
  const token = getCookie('token');

  useEffect(() => {
     get_booking_by_id(router.query.booking_id, token)
      .then(response => {
         setData(response)
      })
      .catch((err) => {
        console.log(err)
      })
  },[router])

  return <>
          <Private>
            <Layout>
              {data && data.response && <Order data={data} />}
            </Layout>
          </Private>
         </>
}


export default withRouter(FinalOrder);
