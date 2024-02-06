import { useSelector, useDispatch } from 'react-redux';

import { startLoadSubCategories, getOneSubCategory, deleteOneSubCategory, editOneSubCategory, addOneSubCategory, searchSubCategories  } from '../store/actions/subCategoryActions'; 
import { useNavigate } from 'react-router-dom';

export const useSubCategories = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const {subCategories, subCategory } = useSelector(state => state.subCategories)

    const loadSubCategories = async () => await dispatch(startLoadSubCategories());

    const loadSubCategory = async subCategory_id => await dispatch(getOneSubCategory(subCategory_id));

    const deleteSubCategory = async id =>{
        const response = await dispatch(deleteOneSubCategory(id));
        if (response) {
            navigate('/auth/SubCategorias', {replace:true})
        }
    } 
    
    const editSubCategory = async (subCategory_id, values) => 
    {
        const response =  await dispatch(editOneSubCategory(subCategory_id,values));
        if (response) {
            navigate('/auth/SubCategorias',{replace:true})
            
        }
    }
   
    
    const addSubCategory = async values => await dispatch(addOneSubCategory(values));

    const searchSubCategory = async value => await dispatch(searchSubCategories(value));

    return { subCategories, subCategory, loadSubCategories, loadSubCategory, deleteSubCategory, editSubCategory, addSubCategory, searchSubCategory }


}