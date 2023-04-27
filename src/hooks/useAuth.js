import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { startLogin, startRevalidateToken } from '../store/actions/authActions';
import { startLoading, stopLoading } from '../store/reducer/uiReducer';

export const useAuth = () => {

    const dispatch = useDispatch();

    const login = async values => {
        dispatch(startLoading());
        const { success } = await dispatch(startLogin(values));
        if (!success) return dispatch(stopLoading());
        dispatch(stopLoading());
    }

    const revalidateToken = async () => {
        dispatch(startLoading())
        await dispatch(startRevalidateToken());
        dispatch(stopLoading());
    }

    return { login, revalidateToken }

}