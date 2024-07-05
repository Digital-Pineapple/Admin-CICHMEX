import { useSelector, useDispatch } from 'react-redux';

import { startLoadSubCategories, getOneSubCategory, deleteOneSubCategory, editOneSubCategory, addOneSubCategory, searchSubCategories, getSubCategoriesByCategory  } from '../store/actions/subCategoryActions'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useSubCategories = () => {
    const [subCatByCategory, setSubCateByCategory] = useState([]);
    function loadSubcategoriesByCategory(value){
        dispatch(getSubCategoriesByCategory(value)).then(data=>{
          setSubCateByCategory([...data]);
        });        
    }
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const {subCategories, subCategory} = useSelector(state => state.subCategories)

    const loadSubCategories = async () => await dispatch(startLoadSubCategories());

    const loadSubCategory = async subCategory_id => await dispatch(getOneSubCategory(subCategory_id));

    const deleteSubCategory = async id =>{
        const response = await dispatch(deleteOneSubCategory(id));
        if (response) {
            navigate('/auth/SubCategorias', {replace:true})
        }
    } 
    
    const editSubCategory = async (subCategory_id, values) =>  await dispatch(editOneSubCategory(subCategory_id,values, navigate));
 
   
    
    const addSubCategory = async values => await dispatch(addOneSubCategory(values, navigate));

    const searchSubCategory = async value => await dispatch(searchSubCategories(value));

    const rowsSubCategories = subCategories.map((category, _id) => ({
        id: _id.toString(),
        ...category,
      }));

    return { subCategories,navigate, subCatByCategory,rowsSubCategories, subCategory, loadSubCategories, loadSubCategory, deleteSubCategory, editSubCategory, addSubCategory, searchSubCategory, loadSubcategoriesByCategory }


}