
import { useSelector, useDispatch } from 'react-redux';
import { addOneCarrier, deleteOneUser, editOneUser, getCarrierDrivers, getOneUser, getUsers, verifyOneUser } from '../store/actions/userActions'; 
import { useNavigate } from 'react-router-dom';

export const useUsers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { user, users } = useSelector(state => state.users)
    const { CarrierDrivers, CarrierDriver, loading } = useSelector(state => state.carrierDriver)

    const loadUsers = async () => await dispatch(getUsers());

    const loadCarrierDrivers = () => dispatch(getCarrierDrivers())

    const loadUser = async user_id => await dispatch(getOneUser(user_id));

    const deleteUser = async user_id => await dispatch(deleteOneUser(user_id));

    const verifyUser = async (_id) => {
     await dispatch(verifyOneUser(_id))
   
    }

    const addCarrier = async values => await dispatch(addOneCarrier(values,navigate))

    const editUser = async (user_id, values) => 
    {
       const response =  await dispatch(editOneUser(user_id,values))
        if(response){
            navigate('/auth/usuarios', {replace:true})
        }
    }

    const rowsCarrierDrivers = CarrierDrivers?.map((i, _id) => ({
        id: _id.toString(),
        ...i,
      }));

    return { user, users, loadUser,addCarrier, loadUsers, deleteUser, verifyUser, editUser, navigate, loadCarrierDrivers, rowsCarrierDrivers, CarrierDriver, loading }


}