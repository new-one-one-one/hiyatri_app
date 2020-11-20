import Layout from '../../components/Core/Layout';
import UserListComponent from '../../components/Admin/UserCRUD';
import { getUsers } from '../../actions/user';

const UserCRUD = ({ usersList }) => {
    return <>
            <Layout>
              <UserListComponent usersList={usersList} />
            </Layout>
           </>
}

export async function getStaticProps(){
    return {
        props: {"usersList": await getUsers()},
      }
    }



export default UserCRUD;
