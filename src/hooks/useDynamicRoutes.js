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
  const { dynamicRoutes, dynamicRoute } = useSelector(
    (state) => state.dynamicRoutes
  );
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadDynamicRoutes = () => dispatch(loadAllRoutes());
  const loadEditDynamicRoute = (id, values) =>
    dispatch(startLoadEditDynamicRoute(id, values));

  const loadOneDynamicRoute = async (id) => await dispatch(loadOneRoute(id));
  const deleteDynamicRoute = async (id) => await dispatch(deleteRoute(id));

  const componentLinks = (routes) => {
    const routeNotFound = routes.find((e) => e.id === 1);
    const elLink = routes.map((rdb) => {
      const matchedComponent = AllRoutes.find((i) => i.id === rdb.component);
      return {
        path: rdb.path,
        name: rdb.name,
        element: matchedComponent
          ? matchedComponent.element
          : routeNotFound.element,
      };
    });
    return elLink;
  };

  // Función para agrupar rutas
  const groupRoutes = (routes) => {
    const groupedRoutes = [];
    const seenPaths = {};

    routes.forEach((route) => {
      const pathParts = route.path.split("/");

      // El título común será el primer segmento del path que no sea vacío
      const commonTitle = pathParts[1];

      // Excluimos rutas que tienen parámetros dinámicos en su path, como :id
      if (pathParts.some((part) => part.startsWith(":"))) {
        return; // Salimos del bucle sin procesar esta ruta
      }

      if (commonTitle && !seenPaths[commonTitle]) {
        // Si no se ha visto antes, creamos un nuevo objeto con este título y subrutas
        seenPaths[commonTitle] = {
          title: commonTitle.charAt(0).toUpperCase() + commonTitle.slice(1), // Capitalizamos el título
          subRoutes: [],
        };
        groupedRoutes.push(seenPaths[commonTitle]);
      }

      if (commonTitle) {
        // Agregamos la ruta a las subrutas del título correspondiente
        seenPaths[commonTitle].subRoutes.push(route);
      } else {
        // Si no hay un título común, lo agregamos directamente como una ruta independiente
        groupedRoutes.push(route);
      }
    });
    // Separar el primer grupo (si existe)
    const [firstGroup, ...restGroups] = groupedRoutes;

    // Ordenar alfabéticamente los grupos restantes por título
    const sortedGroups = restGroups.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    // Unir el primer grupo con los ordenados, manteniendo el primero intacto
    return firstGroup ? [firstGroup, ...sortedGroups] : sortedGroups;
  };

  const addRoute = (values) => dispatch(startAddRoute(values, navigate));

  const rowsRoutes = dynamicRoutes?.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));

  return {
    loading,
    componentLinks,
    groupRoutes,
    addRoute,
    loadDynamicRoutes,
    rowsRoutes,
    navigate,
    loadOneDynamicRoute,
    dynamicRoute,
    deleteDynamicRoute,
    loadEditDynamicRoute,
  };
};
