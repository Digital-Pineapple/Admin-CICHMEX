import { useSelector, useDispatch } from 'react-redux';
import { startLoadTypeCars, getOneTypeCar, deleteOneTypeCar, editOneTypeCar, addOneTypeCar } from '../store/actions/typeCarActions'; 
import { useNavigate } from 'react-router-dom';

export const useTypeCars = () => {
  
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux.
  const navigate = useNavigate(); // Hook para navegar entre rutas en React Router.
  
  // Extrae los datos del estado global de Redux relacionados con los tipos de autos.
  const { typeCars, typeCar } = useSelector(state => state.typeCars);

  // Función para cargar todos los tipos de autos desde el backend.
  const loadTypeCars = async () => await dispatch(startLoadTypeCars());

  // Función para cargar un tipo de auto específico por su ID.
  const loadTypeCar = async typeCar_id => await dispatch(getOneTypeCar(typeCar_id));

  // Función para eliminar un tipo de auto específico por su ID.
  const deleteTypeCar = async typeCar_id => await dispatch(deleteOneTypeCar(typeCar_id));
  
  // Función para editar un tipo de auto específico con nuevos valores.
  const editTypeCar = async (typeCar_id, values) => await dispatch(editOneTypeCar(typeCar_id, values));
  
  // Función para agregar un nuevo tipo de auto.
  const addTypeCar = async values => await dispatch(addOneTypeCar(values));

  // Mapea los tipos de autos para estructurarlos en un formato adecuado para su uso en tablas u otros componentes.
  const rowsTypeCars = typeCars.map((typeCars, _id) => (
    {
    id: _id.toString(), // Asigna un ID único basado en el índice.
    ...typeCars, // Copia las propiedades del tipo de auto.
    }));
  
  // Retorna las funciones y datos necesarios para ser utilizados en los componentes.
  return { typeCar, rowsTypeCars, navigate, typeCars, loadTypeCars, loadTypeCar, deleteTypeCar, editTypeCar, addTypeCar };
}