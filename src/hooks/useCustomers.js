
import { useSelector, useDispatch } from 'react-redux';

import { deleteOneCustomer, getOneCustomer, startLoadCustomers } from '../store/actions/customerActions'; 

export const useCustomers = () => {
    
    const dispatch = useDispatch();

    const { customer, customers } = useSelector(state => state.customers)

    const loadCustomers = async () => await dispatch(startLoadCustomers());

    const loadCustomer = async customer_id => await dispatch(getOneCustomer(customer_id));

    const deleteCustomer = async customer_id => await dispatch(deleteOneCustomer(customer_id));

    return { loadCustomers, customer, loadCustomer, customers, deleteCustomer }


}