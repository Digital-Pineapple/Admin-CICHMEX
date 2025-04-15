import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadAllRoutes,
  loadOneRoute,
  startAddRoute,
  deleteRoute,
  startLoadEditDynamicRoute,
} from "../store/actions/dynamicRouteActions";
import { AllRoutes } from "../routes/AllRoutes";

export const useDynamicRoutes = () => {
  // Obtiene las rutas dinámicas y una ruta específica del estado global
  const { dynamicRoutes, dynamicRoute } = useSelector(
    (state) => state.dynamicRoutes
  );
  // Obtiene el estado de carga desde el estado global
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Carga todas las rutas dinámicas desde el backend
  const loadDynamicRoutes = () => dispatch(loadAllRoutes());

  // Carga una ruta específica para editarla
  const loadEditDynamicRoute = (id, values) =>
    dispatch(startLoadEditDynamicRoute(id, values));

  // Carga una ruta dinámica específica por su ID
  const loadOneDynamicRoute = async (id) => await dispatch(loadOneRoute(id));

  // Elimina una ruta dinámica específica por su ID
  const deleteDynamicRoute = async (id) => await dispatch(deleteRoute(id));

  // Genera los enlaces de componentes basados en las rutas dinámicas
  const componentLinks = (routes) => {
    const routeNotFound = routes.find((e) => e.id === 1); // Ruta de "No encontrado"
    const elLink = routes.map((rdb) => {
      const matchedComponent = AllRoutes.find((i) => i.id === rdb.component); // Busca el componente correspondiente
      return {
        path: rdb.path,
        name: rdb.name,
        element: matchedComponent
          ? matchedComponent?.element
          : routeNotFound?.element, // Usa el componente encontrado o el de "No encontrado"
      };
    });
    return elLink;
  };

  // Agrupa las rutas dinámicas por un título común basado en el primer segmento del path
  const groupRoutes = (routes) => {
    const groupedRoutes = [];
    const seenPaths = {};

    routes.forEach((route) => {
      const pathParts = route.path.split("/");

      // El título común será el primer segmento del path que no sea vacío
      const commonTitle = pathParts[1];

      // Excluye rutas con parámetros dinámicos en su path, como :id
      if (pathParts.some((part) => part.startsWith(":"))) {
        return; // Ignora esta ruta
      }

      if (commonTitle && !seenPaths[commonTitle]) {
        // Si no se ha visto antes, crea un nuevo grupo con este título
        seenPaths[commonTitle] = {
          title: commonTitle.charAt(0).toUpperCase() + commonTitle.slice(1), // Capitaliza el título
          subRoutes: [],
        };
        groupedRoutes.push(seenPaths[commonTitle]);
      }

      if (commonTitle) {
        // Agrega la ruta al grupo correspondiente
        seenPaths[commonTitle].subRoutes.push(route);
      } else {
        // Si no hay un título común, agrega la ruta como independiente
        groupedRoutes.push(route);
      }
    });

    // Separa el primer grupo (si existe)
    const [firstGroup, ...restGroups] = groupedRoutes;

    // Ordena alfabéticamente los grupos restantes por título
    const sortedGroups = restGroups.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    // Retorna el primer grupo junto con los grupos ordenados
    return firstGroup ? [firstGroup, ...sortedGroups] : sortedGroups;
  };

  // Agrega una nueva ruta dinámica y navega a la nueva ruta
  const addRoute = (values) => dispatch(startAddRoute(values, navigate));

  // Convierte las rutas dinámicas en un formato adecuado para ser usadas en tablas
  const rowsRoutes = dynamicRoutes?.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));

  // Retorna todas las funcionalidades disponibles del hook
  return {
    loading, // Estado de carga
    componentLinks, // Generación de enlaces de componentes
    groupRoutes, // Agrupación de rutas
    addRoute, // Agregar una nueva ruta
    loadDynamicRoutes, // Cargar todas las rutas dinámicas
    rowsRoutes, // Rutas en formato de filas
    navigate, // Navegación
    loadOneDynamicRoute, // Cargar una ruta específica
    dynamicRoute, // Ruta específica cargada
    deleteDynamicRoute, // Eliminar una ruta
    loadEditDynamicRoute, // Cargar una ruta para edición
  };
};
