import { useSelector, useDispatch } from 'react-redux';

import { getOneUser, startLoadUsers } from '../store/actions/userActions'; 

export const useUsers = () => {
    
    const dispatch = useDispatch();

    const { user, users } = useSelector(state => state.users)

    const loadUsers = async () => await dispatch(startLoadUsers());

    const loadDataUser = async user_id => await dispatch(getOneUser(user_id));

    return { loadDataUser, user, loadUsers, users }


}