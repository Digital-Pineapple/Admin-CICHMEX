import { useSelector, useDispatch } from 'react-redux';

import { startLoadCategories, getOneCategory, deleteOneCategory, editOneCategory, addOneCategory, searchCategories  } from '../store/actions/categoryActions'; 

export const useCategories = () => {
    
    const dispatch = useDispatch();
    
    // Obtiene las categorías y una categoría específica del estado global
    const { categories, category } = useSelector(state => state.categories)

    // Carga todas las categorías desde el servidor
    const loadService = async () => await dispatch(startLoadCategories());

    // Carga una categoría específica por su ID
    const loadCategory = async category_id => await dispatch(getOneCategory(category_id));

    // Elimina una categoría específica por su ID
    const deleteCategory = async category_id => await dispatch(deleteOneCategory(category_id));
    
    // Edita una categoría específica con los valores proporcionados
    const editCategory = async (category_id, {name, description, category_image, status}) => 
        await dispatch(editOneCategory(category_id, {name, description, category_image, status}));
    
    // Agrega una nueva categoría con los valores proporcionados
    const addCategory = async values => await dispatch(addOneCategory(values));

    // Busca categorías que coincidan con un valor específico
    const searchCategory = async value => await dispatch(searchCategories(value));

    // Retorna las categorías, una categoría específica y las funciones para interactuar con ellas
    return { categories, category, loadCategories, loadCategory, deleteCategory, editCategory, addCategory, searchCategory }
}