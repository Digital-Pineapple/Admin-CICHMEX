import axios from 'axios';
import Cookies from 'js-cookie';
import { instanceApi } from '../../config/configAxios';
import { login } from '../reducer/authReducer';

export const startLogin = (values) =>
    async dispatch => {
        try {
            const { data } = await instanceApi.post('/auth/login', values)
            dispatch(login(data.data.user));
            Cookies.set('session', data.data.token, { expires : 7 });
            return {
                success: true
            }
        } catch (error) {
            if(axios.isAxiosError(error)) {
                alert(error.response.data.message);
                return {
                    success: false
                }
            }
            return {
                success: false
            }
        }
    }

    export const startRevalidateToken = () => 
        async dispatch => {
            try {
                const { data } = await instanceApi.get('/auth/customer')
                dispatch(login(data.data.user));
                Cookies.set('session', data.data.token, { expires : 7 });
            } catch (error) {
                console.log(error)
            }
        }
    