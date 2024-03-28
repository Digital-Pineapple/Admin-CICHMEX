
import { useSelector, useDispatch } from 'react-redux';
import { deleteOneUser, editOneUser, getOneUser, getUsers, verifyOneUser } from '../store/actions/userActions'; 
import { useNavigate } from 'react-router-dom';

export const useUsers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { user, users } = useSelector(state => state.users)

    const loadUsers = async () => await dispatch(getUsers());

    const loadUser = async user_id => await dispatch(getOneUser(user_id));

    const deleteUser = async user_id => await dispatch(deleteOneUser(user_id));

    const verifyUser = async (_id) => {
     await dispatch(verifyOneUser(_id))
   
    }

    const editUser = async (user_id, values) => 
    {
       const response =  await dispatch(editOneUser(user_id,values))
        if(response){
            navigate('/auth/usuarios', {replace:true})
        }
    }

    return { user, users, loadUser, loadUsers, deleteUser, verifyUser, editUser, navigate }


}