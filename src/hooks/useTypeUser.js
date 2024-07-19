import { useSelector, useDispatch } from 'react-redux';

import { startCreateTypeUser, startLoadTypeUsers  } from '../store/actions/typeUserActions'; 
import { useNavigate } from 'react-router-dom';

export const useTypeUser = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { typeUsers } = useSelector(state => state.typeUser)

    const loadTypeUsers = async () => await dispatch(startLoadTypeUsers());
    
    const createTypeUser = async(values)=> await dispatch(startCreateTypeUser(values, navigate))

    const rowsTypeUser = typeUsers?.map((i, _id) => {
       let row = { id: _id.toString(),
        _id : i._id,
        role: i.role,
        system: i.system,
      }
      return row
    }
       
       
  );

    return { loadTypeUsers, typeUsers, rowsTypeUser, navigate, createTypeUser }


}