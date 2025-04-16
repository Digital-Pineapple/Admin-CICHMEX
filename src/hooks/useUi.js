import { useSelector, useDispatch } from 'react-redux';
import { startChangeActive, startCreateOneBanner, startDeleteBanner, startLoadAllBanners, startLoadOneBanner, startUpdateOneBanner  } from '../store/actions/uiActions'; 
import { useNavigate } from 'react-router-dom';

// Hook personalizado para manejar la lógica relacionada con la interfaz de usuario (UI)
export const useUI = () => {
    
    const dispatch = useDispatch(); // Hook para despachar acciones de Redux
    const navigate = useNavigate(); // Hook para navegar entre rutas

    // Extrae datos del estado global de Redux relacionados con la UI
    const { loading, links, colors, banners, banner } = useSelector(state => state.ui);

    // Función para cargar todos los banners
    const loadAllBanners =  () =>  dispatch(startLoadAllBanners());

    // Función para cargar un banner específico por su ID
    const loadOneBanner = (id) => dispatch(startLoadOneBanner(id, navigate));

    // Función para cambiar el estado activo de un banner
    const changeActiveBanner = (id, active) => dispatch(startChangeActive(id, active));

    // Función para eliminar un banner por su ID
    const deleteOneBanner = (id) => dispatch(startDeleteBanner(id));

    // Función para crear un nuevo banner con los datos proporcionados
    const createOneBanner = (data) => {
        const body = {
            is_active : data.is_active, // Indica si el banner está activo
            no_slide: data.no_slide, // Número de diapositiva
            for_discount: data.for_discount, // Indica si es para descuento
            discount: data.discount, // Porcentaje o valor del descuento
            title: data.title, // Título del banner
            description : data.description, // Descripción del banner
            type_event : data.type_event, // Tipo de evento asociado al banner
            image_slide: data.image_slide, // Imagen para la versión de escritorio
            image_slide_movil: data.image_slide_movil, // Imagen para la versión móvil
        };
        
        // Despacha la acción para crear el banner y redirige si es necesario
        dispatch(startCreateOneBanner(body, navigate));
    };

    // Función para actualizar un banner existente por su ID con los datos proporcionados
    const updateOneBanner = (id, data) => {
        const body = {
            is_active : data.is_active, // Indica si el banner está activo
            no_slide: data.no_slide, // Número de diapositiva
            for_discount: data.for_discount, // Indica si es para descuento
            discount: data.discount, // Porcentaje o valor del descuento
            title: data.title, // Título del banner
            description : data.description, // Descripción del banner
            type_event : data.type_event, // Tipo de evento asociado al banner
            image_slide: data.image_slide, // Imagen para la versión de escritorio
            image_slide_movil: data.image_slide_movil, // Imagen para la versión móvil
        };
        
        // Despacha la acción para actualizar el banner y redirige si es necesario
        dispatch(startUpdateOneBanner(id, body, navigate));
    };

    // Retorna las propiedades y funciones necesarias para interactuar con la UI
    return { 
        loading, // Estado de carga
        banners, // Lista de banners
        banner, // Banner específico
        loadAllBanners, // Función para cargar todos los banners
        navigate, // Navegador para redirigir
        loadOneBanner, // Función para cargar un banner específico
        createOneBanner, // Función para crear un banner
        changeActiveBanner, // Función para cambiar el estado activo de un banner
        deleteOneBanner, // Función para eliminar un banner
        updateOneBanner // Función para actualizar un banner
    };
};