import { instanceApi } from "../../config/configAxios"
import { loadUser, loadUsers } from "../reducer/userReducer"

export const startLoadUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await instanceApi.get('/customer')
            dispatch(loadUsers({ users: data.data }))
        } catch (error) {
            console.log(error)
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

export const deleteOneUser = (id) =>
    async dispatch => {
        try {
            const { data } = await instanceApi.delete(`/customer/${id}`)
            dispatch(loadUser(data.data));
        } catch (error) {
            console.log(error);
        }
    }