import { useSelector, useDispatch } from 'react-redux';

import { startLoadSubCategories, getOneSubCategory, deleteOneSubCategory, editOneSubCategory, addOneSubCategory, searchSubCategories  } from '../store/actions/subCategoryActions'; 

export const useSubCategories = () => {
    
    const dispatch = useDispatch();
    
    const {subCategories, subCategory } = useSelector(state => state.subCategories)

    const loadSubCategories = async () => await dispatch(startLoadSubCategories());

    const loadSubCategory = async subCategory_id => await dispatch(getOneSubCategory(subCategory_id));

    const deleteSubCategory = async id => await dispatch(deleteOneSubCategory(id));
    
    const editSubCategory = async (subCategory_id, values) => await dispatch(editOneSubCategory(subCategory_id,values));
    
    const addSubCategory = async values => await dispatch(addOneSubCategory(values));

    const searchSubCategory = async value => await dispatch(searchSubCategories(value));

    return { subCategories, subCategory, loadSubCategories, loadSubCategory, deleteSubCategory, editSubCategory, addSubCategory, searchSubCategory }


}