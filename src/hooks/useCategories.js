import { useSelector, useDispatch } from 'react-redux';

import { startLoadCategories, getOneCategory, deleteOneCategory, editOneCategory, addOneCategory  } from '../store/actions/categoryActions'; 

export const useCategories = () => {
    
    const dispatch = useDispatch();
    
    const { categories, category } = useSelector(state => state.categories)

    const loadCategories = async () => await dispatch(startLoadCategories());

    const loadCategory = async category_id => await dispatch(getOneCategory(category_id));

    const deleteCategory = async category_id => await dispatch(deleteOneCategory(category_id));
    
    const editCategory = async (category_id, values) => await dispatch(editOneCategory(category_id,values));
    
    const addCategory = async values => await dispatch(addOneCategory(values));

    return { categories, category, loadCategories, loadCategory, deleteCategory, editCategory, addCategory }


}