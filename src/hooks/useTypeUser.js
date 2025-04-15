import { useSelector, useDispatch } from 'react-redux';
import { startCreateTypeUser, startLoadTypeUsers } from '../store/actions/typeUserActions'; 
import { useNavigate } from 'react-router-dom';

export const useTypeUser = () => {
  
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux.
  const navigate = useNavigate(); // Hook para navegar entre rutas en React Router.
  
  // Obtiene el estado de los usuarios por tipo desde el store de Redux.
  const { typeUsers } = useSelector(state => state.typeUser);

  // Función para cargar los usuarios por tipo desde el backend.
  const loadTypeUsers = async () => await dispatch(startLoadTypeUsers());
  
  // Función para crear un nuevo usuario por tipo y navegar a otra ruta si es necesario.
  const createTypeUser = async (values) => await dispatch(startCreateTypeUser(values, navigate));

  // Mapea los usuarios por tipo para estructurarlos en filas con un formato específico.
  const rowsTypeUser = typeUsers?.map((i, _id) => {
    let row = { 
      id: _id.toString(), // Identificador único para cada fila.
      _id: i._id, // ID del usuario en la base de datos.
      role: i.role, // Rol del usuario.
      system: i.system, // Sistema asociado al usuario.
    };
    return row;
  });

  // Retorna las funciones y datos necesarios para ser utilizados en otros componentes.
  return { loadTypeUsers, typeUsers, rowsTypeUser, navigate, createTypeUser };
};