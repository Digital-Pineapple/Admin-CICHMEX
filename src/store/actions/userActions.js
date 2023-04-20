import axios from "axios"
import { instanceApi } from "../../config/configAxios"
import { loadUsers } from "../reducer/userReducer"

export const startLoadUsers= () => {
    return async (dispatch) => {
        try {
            const {data} = await instanceApi.get('/customer')
            console.log(data);
            dispatch(loadUsers({users:data.data}))
        } catch (error) {
            console.log('Error');
        }
    }
}