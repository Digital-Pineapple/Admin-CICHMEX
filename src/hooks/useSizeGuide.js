import { useSelector, useDispatch } from 'react-redux';

import { startLoadSizeGuides } from '../store/actions/sizeGuideActions'; 
import { useNavigate } from 'react-router-dom';

export const useSizeGuide = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { sizeGuides, sizeGuide } = useSelector(state => state.sizeGuide);

    const loadSizeGuides = async () => await dispatch(startLoadSizeGuides());


    return { loadSizeGuides, navigate, sizeGuides, sizeGuide  }


}
