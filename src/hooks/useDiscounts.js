import { useSelector, useDispatch } from 'react-redux';
import { startLoadChangeActive, startLoadCreateDiscount, startLoadDiscountDetail, startLoadDiscounts, startLoadUpdateDiscount } from '../store/actions/discountsActions';
import { useNavigate } from 'react-router-dom';

// Hook personalizado para manejar descuentos
export const useDiscounts = () => {
    
    const dispatch = useDispatch(); // Hook para despachar acciones de Redux
    const navigate = useNavigate(); // Hook para navegar entre rutas

    // Extraer datos del estado global de Redux
    const { discounts, discount, loadingDiscount } = useSelector(state => state.discounts); // Estado relacionado con los descuentos
    const { loading } = useSelector(state => state.ui); // Estado de carga general de la interfaz de usuario

    // Función para cargar todos los descuentos
    const loadAllDiscounts = () => dispatch(startLoadDiscounts());

    // Función para cargar el detalle de un descuento específico por su ID
    const loadDiscountDetail = (id) => dispatch(startLoadDiscountDetail(id));

    // Función para crear un nuevo descuento y redirigir al usuario
    const createDiscount = (values) => dispatch(startLoadCreateDiscount(values, navigate));

    // Función para actualizar un descuento existente por su ID y redirigir al usuario
    const updateDiscount = (id, values) => dispatch(startLoadUpdateDiscount(id, values, navigate));

    // Función para cambiar el estado activo/inactivo de un descuento
    const changeActiveDiscount = (id, value) => dispatch(startLoadChangeActive(id, value));

    // Retornar todas las funciones y estados necesarios para manejar descuentos
    return { 
        loadAllDiscounts, // Cargar todos los descuentos
        createDiscount, // Crear un descuento
        discounts, // Lista de descuentos
        discount, // Detalle de un descuento específico
        loading, // Estado de carga general
        loadingDiscount, // Estado de carga relacionado con los descuentos
        loadDiscountDetail, // Cargar detalle de un descuento
        updateDiscount, // Actualizar un descuento
        changeActiveDiscount, // Cambiar estado activo/inactivo de un descuento
        navigate // Navegación entre rutas
    };
};