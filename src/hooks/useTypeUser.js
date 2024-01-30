import { useSelector, useDispatch } from 'react-redux';

import { startLoadTypeUsers  } from '../store/actions/typeUserActions'; 

export const useTypeUser = () => {
    
    const dispatch = useDispatch();
    
    const { typeUsers } = useSelector(state => state.typeUser)

    const loadTypeUsers = async () => await dispatch(startLoadTypeUsers());
    return { loadTypeUsers, typeUsers }


}