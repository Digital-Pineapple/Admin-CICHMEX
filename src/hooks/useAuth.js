import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { startLogin } from '../store/actions/authActions';
import { startLoading, stopLoading } from '../store/reducer/uiReducer';

export const useAuth = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async values => { 
        dispatch(startLoading());
        const { success } = await dispatch(startLogin(values));
        if(!success) return dispatch(stopLoading());
        dispatch(stopLoading());
        navigate('/Usuarios');
    }

    return { login }

}