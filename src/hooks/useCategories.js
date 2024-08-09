import { useSelector, useDispatch } from 'react-redux';
import { startLoadCategories, getOneCategory, deleteOneCategory, editOneCategory, addOneCategory, searchCategories  } from '../store/actions/categoryActions'; 
import { useNavigate } from 'react-router-dom';

export const useCategories = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { categories, category } = useSelector(state => state.categories)
    const { loading } = useSelector(state => state.ui)

    const loadCategories = async () => await dispatch(startLoadCategories());

    const loadCategory = async category_id => await dispatch(getOneCategory(category_id));

    const deleteCategory = async category_id => await dispatch(deleteOneCategory(category_id));
    
    const editCategory = async (category_id, values) => await dispatch(editOneCategory(category_id,values,navigate));
    
    const addCategory = async (values) => await dispatch(addOneCategory(values, navigate));

    const searchCategory = async value => await dispatch(searchCategories(value));

    return { navigate, categories, category, loadCategories, loadCategory, deleteCategory, editCategory, addCategory, searchCategory, loading }


}