import Layout from '../../../components/Core/Layout';
// import Private from '../../../components/Core/Private';
import { withRouter } from 'next/router';
import Order from '../../../components/Order';
import { get_booking_by_id } from '../../../actions/booking';

const FinalOrder = ({ data }) => {
  return <>
            <Layout>

                 <Order data={data} />
 
            </Layout>
         </>
}

FinalOrder.getInitialProps = ({ query }) => {
  return  get_booking_by_id(query.booking_id)
  .then(data => {
     return { data }
  })
  .catch(err => {
     return console.log(err)
  })
}


export default withRouter(FinalOrder);
