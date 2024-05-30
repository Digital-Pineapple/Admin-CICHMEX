import { useSelector, useDispatch } from 'react-redux';

import { startLoadCategories, getOneCategory, deleteOneCategory, editOneCategory, addOneCategory, searchCategories  } from '../store/actions/categoryActions'; 

export const useCategories = () => {
    
    const dispatch = useDispatch();
    
    const { categories, category } = useSelector(state => state.categories)

    const loadCategories = async () => await dispatch(startLoadCategories());

    const loadCategory = async category_id => await dispatch(getOneCategory(category_id));

    const deleteCategory = async category_id => await dispatch(deleteOneCategory(category_id));
    
    const editCategory = async (category_id, {name, category_image}) => await dispatch(editOneCategory(category_id,{name, category_image,}));
    
    const addCategory = async (values, files) => await dispatch(addOneCategory(values, files));

    const searchCategory = async value => await dispatch(searchCategories(value));

    return { categories, category, loadCategories, loadCategory, deleteCategory, editCategory, addCategory, searchCategory }


}