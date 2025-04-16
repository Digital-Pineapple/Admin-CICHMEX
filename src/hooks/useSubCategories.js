import { useSelector, useDispatch } from 'react-redux';
import { startLoadSubCategories, getOneSubCategory, deleteOneSubCategory, editOneSubCategory, addOneSubCategory, searchSubCategories, getSubCategoriesByCategory, getOneDetailSubCategory  } from '../store/actions/subCategoryActions'; 
import { useNavigate } from 'react-router-dom';

export const useSubCategories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    // Obtiene los datos del estado global relacionados con las subcategorías
    const {subCategories, subCategory, subCategoriesByCategory} = useSelector(state => state.subCategories)
    const {loading} = useSelector(state => state.ui)

    // Carga todas las subcategorías desde la base de datos
    const loadSubCategories = async () => await dispatch(startLoadSubCategories());

    // Carga una subcategoría específica por su ID
    const loadSubCategory = async subCategory_id => await dispatch(getOneSubCategory(subCategory_id));

    // Carga los detalles de una subcategoría específica por su ID
    const loadSubCategoryDetail = async _id => await dispatch(getOneDetailSubCategory(_id));

    // Carga las subcategorías asociadas a una categoría específica
    const loadSubCategoriesByCategory = async (id) => await dispatch(getSubCategoriesByCategory(id))

    // Elimina una subcategoría específica por su ID y redirige al usuario
    const deleteSubCategory = async id =>await dispatch(deleteOneSubCategory(id, navigate))
    
    // Edita una subcategoría específica con los valores proporcionados y cierra el modal
    const editSubCategory = async (subCategory_id, values, handleClose) =>  await dispatch(editOneSubCategory(subCategory_id,values, handleClose));
 
    // Agrega una nueva subcategoría con los valores proporcionados y cierra el modal
    const addSubCategory = async (values, handleClose) => await dispatch(addOneSubCategory(values, handleClose));

    // Busca subcategorías que coincidan con un valor específico
    const searchSubCategory = async value => await dispatch(searchSubCategories(value));

    // Retorna todas las funciones y datos necesarios para manejar subcategorías
    return { subCategories,loading, navigate, subCategory, loadSubCategories, loadSubCategory, deleteSubCategory, editSubCategory, addSubCategory,loadSubCategoryDetail, searchSubCategory, loadSubCategoriesByCategory, subCategoriesByCategory  }
}