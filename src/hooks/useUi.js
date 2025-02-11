import { useSelector, useDispatch } from 'react-redux';
import { startChangeActive, startCreateOneBanner, startDeleteBanner, startLoadAllBanners, startLoadOneBanner, startUpdateOneBanner  } from '../store/actions/uiActions'; 
import { useNavigate } from 'react-router-dom';

export const useUI = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { loading, links, colors, banners, banner } = useSelector(state => state.ui)

    const loadAllBanners =  () =>  dispatch(startLoadAllBanners());

    const loadOneBanner = (id) => dispatch(startLoadOneBanner(id));
    const changeActiveBanner = (id, active) => dispatch(startChangeActive(id, active))
    const deleteOneBanner = (id) => dispatch(startDeleteBanner(id))
    const createOneBanner = (data) => {
        const body = {
            is_active : data.is_active,
            no_slide: data.no_slide,
            for_discount: data.for_discount,
            discount: data.discount,
            title: data.title,
            description : data.description,
            type_event : data.type_event,
            image_slide: data.image_slide,
            image_slide_movil: data.image_slide_movil,

        }
        
        dispatch(startCreateOneBanner(body, navigate))
        
    }
    const updateOneBanner = (id,data) => {
        const body = {
            is_active : data.is_active,
            no_slide: data.no_slide,
            for_discount: data.for_discount,
            discount: data.discount,
            title: data.title,
            description : data.description,
            type_event : data.type_event,
            image_slide: data.image_slide,
            image_slide_movil: data.image_slide_movil,

        }
        
        dispatch(startUpdateOneBanner(id,body, navigate))
        
    }
    

    return { loading, banners, banner, loadAllBanners, navigate, loadOneBanner, createOneBanner, changeActiveBanner, deleteOneBanner, updateOneBanner }


}