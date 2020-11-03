import Layout from '../../../components/Core/Layout';
import Private from '../../../components/Core/Private';
import { withRouter } from 'next/router';
import Order from '../../../components/Order/index.tsx';
import { getBookingByPnr } from '../../../actions/booking';

const FinalOrder = ({ data }) => {
  return <>
            <Layout>
               <Private>
                 <Order data={data} />
               </Private>
            </Layout>
         </>
}

FinalOrder.getInitialProps = ({ query }) => {
  return  getBookingByPnr(query.pid)
  .then(data => {
     return { data }
  })
  .catch(err => {
     return console.log(err)
  })
}


export default withRouter(FinalOrder);
