import { instanceApi } from "../../config/configAxios"
import { loadUser, loadUsers } from "../reducer/userReducer"

export const startLoadUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await instanceApi.get('/customer')
            console.log(data);
            dispatch(loadUsers({ users: data.data }))
        } catch (error) {
            console.log('Error');
        }
    }
}

export const getOneUser = (id) =>
    async dispatch => {
        try {
            const { data } = await instanceApi.get(`/customer/${id}`)
            dispatch(loadUser(data.data));
        } catch (error) {
            console.log(error);
        }
    }
