import { useSelector, useDispatch } from 'react-redux';

import { startLoadTypeCars, getOneTypeCar, deleteOneTypeCar, editOneTypeCar, addOneTypeCar  } from '../store/actions/typeCarActions'; 
import { useNavigate } from 'react-router-dom';

export const useTypeCars = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { typeCars, typeCar } = useSelector(state => state.typeCars)

    const loadTypeCars = async () => await dispatch(startLoadTypeCars());

    const loadTypeCar= async typeCar_id => await dispatch(getOneTypeCar(typeCar_id));

    const deleteTypeCar = async typeCar_id => await dispatch(deleteOneTypeCar(typeCar_id));
    
    const editTypeCar = async (typeCar_id, values) => await dispatch(editOneTypeCar(typeCar_id,values));
    
    const addTypeCar = async values => await dispatch(addOneTypeCar(values));

    const rowsTypeCars = typeCars.map((typeCars, _id) => (
        {
        id: _id.toString(),
        ...typeCars,
      }));
    

    return { typeCar,rowsTypeCars,navigate, typeCars, loadTypeCars, loadTypeCar, deleteTypeCar, editTypeCar, addTypeCar }


}