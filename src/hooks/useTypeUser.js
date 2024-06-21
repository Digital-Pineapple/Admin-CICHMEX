import { useSelector, useDispatch } from 'react-redux';

import { startCreateTypeUser, startLoadTypeUsers  } from '../store/actions/typeUserActions'; 
import { useNavigate } from 'react-router-dom';

export const useTypeUser = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { typeUsers } = useSelector(state => state.typeUser)

    const loadTypeUsers = async () => await dispatch(startLoadTypeUsers());
    
    const createTypeUser = async(values)=> await dispatch(startCreateTypeUser(values, navigate))

    const rowsTypeUser = typeUsers?.map((i, _id) => ({
        id: _id.toString(),
        ...i,
      }));

    return { loadTypeUsers, typeUsers, rowsTypeUser, navigate, createTypeUser }


}