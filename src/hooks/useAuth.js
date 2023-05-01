import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { startLogin, startRevalidateToken } from '../store/actions/authActions';
import { stopLoading } from '../store/reducer/uiReducer';

export const useAuth = () => {

    const dispatch = useDispatch();

    const login = async values =>  await dispatch(startLogin(values));
    

    const revalidateToken = async () => {
        await dispatch(startRevalidateToken());
        dispatch(stopLoading());
    }

    return { login, revalidateToken }

}