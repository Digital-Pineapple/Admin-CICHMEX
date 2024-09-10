import { useSelector, useDispatch } from 'react-redux';
import { startLoadSubCategories, getOneSubCategory, deleteOneSubCategory, editOneSubCategory, addOneSubCategory, searchSubCategories, getSubCategoriesByCategory, getOneDetailSubCategory  } from '../store/actions/subCategoryActions'; 
import { useNavigate } from 'react-router-dom';

export const useSubCategories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const {subCategories, subCategory, subCategoriesByCategory} = useSelector(state => state.subCategories)
    const {loading} = useSelector(state => state.ui)


    const loadSubCategories = async () => await dispatch(startLoadSubCategories());

    const loadSubCategory = async subCategory_id => await dispatch(getOneSubCategory(subCategory_id));
    const loadSubCategoryDetail = async _id => await dispatch(getOneDetailSubCategory(_id));

    const loadSubCategoriesByCategory = async (id) => await dispatch(getSubCategoriesByCategory(id))

    const deleteSubCategory = async id =>await dispatch(deleteOneSubCategory(id, navigate))
    
    const editSubCategory = async (subCategory_id, values) =>  await dispatch(editOneSubCategory(subCategory_id,values, navigate));
 
   
    
    const addSubCategory = async values => await dispatch(addOneSubCategory(values, navigate));

    const searchSubCategory = async value => await dispatch(searchSubCategories(value));

    const rowsSubCategories = subCategories.map((category, _id) => ({
        id: _id.toString(),
        ...category,
      }));

    return { subCategories,loading, navigate,rowsSubCategories, subCategory, loadSubCategories, loadSubCategory, deleteSubCategory, editSubCategory, addSubCategory,loadSubCategoryDetail, searchSubCategory, loadSubCategoriesByCategory, subCategoriesByCategory  }


}