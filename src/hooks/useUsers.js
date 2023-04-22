import { useSelector, useDispatch } from 'react-redux';

import { getOneUser } from '../store/actions/userActions'; 

export const useUsers = () => {
    
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.userReducer)

    const loadDataUser = async user_id => dispatch(getOneUser(user_id));

    return { loadDataUser, user }


}