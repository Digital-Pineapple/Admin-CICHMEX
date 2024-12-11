import { useSelector, useDispatch } from 'react-redux';

import { startAddOneSizeGuide, startLoadOneSizeGuide, startLoadSizeGuides, startSelectSizeGuide } from '../store/actions/sizeGuideActions'; 
import { useNavigate } from 'react-router-dom';

export const useSizeGuide = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { sizeGuides, sizeGuide } = useSelector(state => state.sizeGuide);

    const loadSizeGuides = async () => await dispatch(startLoadSizeGuides());

    const loadAddOneSizeGuide = (values) => dispatch(startAddOneSizeGuide(values))

    const loadOneSizeGuide = async(id) => dispatch(startLoadOneSizeGuide(id))

    

    return { loadSizeGuides, navigate, sizeGuides, sizeGuide, loadAddOneSizeGuide, dispatch , loadOneSizeGuide }


}
