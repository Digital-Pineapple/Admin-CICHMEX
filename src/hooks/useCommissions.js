import { useSelector, useDispatch } from 'react-redux';

import { addOneCommission, deleteOneCommission, editOneCommission, getOneCommission, startLoadCommissions } from '../store/actions/commissionActions'; 

export const useCommissions = () => {
    
    const dispatch = useDispatch();
    
    // Obtiene el estado de las comisiones desde el store de Redux
    const { commissions, commission } = useSelector(state => state.commissions)

    // Carga todas las comisiones desde el backend y las almacena en el estado global
    const loadCommissions = async () => await dispatch(startLoadCommissions());

    // Carga una comisión específica desde el backend según su ID
    const loadCommission = async commision_id => await dispatch(getOneCommission(commision_id));

    // Elimina una comisión específica según su ID
    const deleteCommission = async commision_id => await dispatch(deleteOneCommission(commision_id));
    
    // Edita una comisión específica según su ID y los valores proporcionados
    const editCommission = async (commision_id, values) => await dispatch(editOneCommission(commision_id, values));
    
    // Agrega una nueva comisión con los valores proporcionados
    const addCommission = async values => await dispatch(addOneCommission(values));

    // Retorna las comisiones, una comisión específica y las funciones para interactuar con ellas
    return { commissions, commission, loadCommissions, loadCommission, deleteCommission, editCommission, addCommission }
}