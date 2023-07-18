import { useSelector, useDispatch } from 'react-redux';

import { addOneCommission, deleteOneCommission, editOneCommission, getOneCommission, startLoadCommissions } from '../store/actions/commissionActions'; 

export const useCommissions = () => {
    
    const dispatch = useDispatch();
    
    const { commissions, commission } = useSelector(state => state.commissions)

    const loadCommissions = async () => await dispatch(startLoadCommissions());

    const loadCommission = async commision_id => await dispatch(getOneCommission(commision_id));

    const deleteCommission = async commision_id => await dispatch(deleteOneCommission(commision_id));
    
    const editCommission = async (commision_id, values) => await dispatch(editOneCommission(commision_id,values));
    
    const addCommission = async values => await dispatch(addOneCommission(values));

    return { commissions, commission, loadCommissions, loadCommission, deleteCommission, editCommission, addCommission }


}