import { useDispatch, useSelector } from "react-redux"
import { startLoadOneShippingCost, startLoadShippingCosts, startCreateShippingCost, startDeleteShippingCost, startUpdateShippingCost } from "../store/actions/shippingCostActions";
import { useNavigate } from "react-router-dom";
import { localDate } from "../Utils/ConvertIsoDate";

// Hook personalizado para manejar la lógica relacionada con los costos de envío
export const useShippingCost = () => {

  const dispatch = useDispatch(); // Permite despachar acciones de Redux
  const navigate = useNavigate(); // Permite la navegación programática en React Router

  // Extrae los datos del estado global de Redux
  const { shippingCosts, shippingCost } = useSelector(state => state.shippingCost); 
  const { loading } = useSelector(state => state.ui); 

  // Carga todos los costos de envío desde el backend
  const loadShippingCosts  = async () => await dispatch(startLoadShippingCosts());

  // Carga un costo de envío específico por su ID
  const loadOneShippingCost = async(id) => await dispatch(startLoadOneShippingCost(id));

  // Crea un nuevo costo de envío
  // `values` contiene los datos del nuevo costo, y `handleCloseModal` cierra el modal tras la creación
  const createShippingCost = async (values, handleCloseModal) => 
    await dispatch((startCreateShippingCost(values, navigate, handleCloseModal)));

  // Actualiza un costo de envío existente
  // `id` es el identificador del costo, `value` son los nuevos datos, y `handleCloseModal` cierra el modal tras la actualización
  const updateShippingCost = async (id, value, handleCloseModal) => 
    await dispatch(startUpdateShippingCost(id, value, handleCloseModal));

  // Elimina un costo de envío por su ID
  const deleteShippingCost = async (id) => await dispatch(startDeleteShippingCost(id));

  // Mapea los costos de envío para transformarlos en un formato adecuado para ser usados en tablas o listas
  const rowsShippingCosts = shippingCosts.map((item, _id) => ({
    id: _id.toString(), // Asigna un ID único basado en el índice
    date: localDate(item.createdAt), // Convierte la fecha ISO a un formato local
    ...item, // Incluye el resto de las propiedades del costo de envío
  }));

  // Retorna todas las funcionalidades y datos necesarios para ser usados en componentes
  return { 
    shippingCost, // Costo de envío específico cargado
    shippingCosts, // Lista de todos los costos de envío
    loading, // Estado de carga
    loadShippingCosts, // Función para cargar todos los costos
    loadOneShippingCost, // Función para cargar un costo específico
    createShippingCost, // Función para crear un nuevo costo
    updateShippingCost, // Función para actualizar un costo existente
    deleteShippingCost, // Función para eliminar un costo
    rowsShippingCosts // Datos mapeados para ser usados en tablas o listas
  };
}