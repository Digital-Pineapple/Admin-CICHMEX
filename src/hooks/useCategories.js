import { useSelector, useDispatch } from 'react-redux';
import { startLoadCategories, getOneCategory, deleteOneCategory, editOneCategory, addOneCategory, searchCategories  } from '../store/actions/categoryActions'; 
import { useNavigate } from 'react-router-dom';

export const useCategories = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Obtiene las categorías y una categoría específica del estado global
    const { categories, category } = useSelector(state => state.categories);
    // Obtiene el estado de carga (loading) de la interfaz de usuario
    const { loading } = useSelector(state => state.ui);

    // Carga todas las categorías desde el backend
    const loadCategories = async () => await dispatch(startLoadCategories());

    // Carga una categoría específica por su ID
    const loadCategory = async category_id => await dispatch(getOneCategory(category_id));

    // Elimina una categoría específica por su ID
    const deleteCategory = async category_id => await dispatch(deleteOneCategory(category_id));
    
    // Edita una categoría específica con los valores proporcionados
    const editCategory = async (category_id, values, handleClose) => await dispatch(editOneCategory(category_id, values, handleClose));
    
    // Agrega una nueva categoría con los valores proporcionados
    const addCategory = async (values, handleClose) => await dispatch(addOneCategory(values, handleClose));

    // Busca categorías que coincidan con un valor específico
    const searchCategory = async value => await dispatch(searchCategories(value));

    // Retorna todas las funciones y datos necesarios para interactuar con las categorías
    return { navigate, categories, category, loadCategories, loadCategory, deleteCategory, editCategory, addCategory, searchCategory, loading, dispatch };
}