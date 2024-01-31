
import { useSelector, useDispatch } from 'react-redux';

import { deleteOneCustomer, getOneCustomer, startLoadCustomers,verifyOneCustomer, editOneCustomer } from '../store/actions/customerActions'; 
import { useNavigate } from 'react-router-dom';
import { replace } from 'formik';

export const useCustomers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { customer, customers } = useSelector(state => state.customers)

    const loadCustomers = async () => await dispatch(startLoadCustomers());

    const loadCustomer = async customer_id => await dispatch(getOneCustomer(customer_id));

    const deleteCustomer = async customer_id => await dispatch(deleteOneCustomer(customer_id));

    const verifyCustomer = async (customer_id) => await dispatch(verifyOneCustomer(customer_id));

    const editCustomer = async (customer_id, values) => 
    {
       const response =  await dispatch(editOneCustomer(customer_id,values))
        if(response){
            navigate('/auth/usuarios', {replace:true})
        }
    }

    return { loadCustomers, customer, loadCustomer, customers, deleteCustomer,verifyCustomer, editCustomer }


}