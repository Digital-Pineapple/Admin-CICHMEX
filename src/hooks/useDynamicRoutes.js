import { useDispatch, useSelector } from "react-redux";
import {
  startLogin,
  startLogout,
  startPublicLinks,
  startRevalidateToken,
} from "../store";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";
import { startAddRoute } from "../store/actions/uiActions";

export const useDynamicRoutes = () => {
  const { loading, links } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
// Función para agrupar rutas
const groupRoutes = (routes) => {
    const groupedRoutes = [];
    const seenPaths = {};
  
    routes.forEach(route => {
      const pathParts = route.path.split('/');
      
      // El título común será el primer segmento del path que no sea vacío
      const commonTitle = pathParts[1];
  
      if (commonTitle && !seenPaths[commonTitle]) {
        // Si no se ha visto antes, creamos un nuevo objeto con este título y subrutas
        seenPaths[commonTitle] = {
          title: commonTitle.charAt(0).toUpperCase() + commonTitle.slice(1), // Capitalizamos el título
          subRoutes: []
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
  
    return groupedRoutes;
  };
  
  
  const addRoute = (values) => dispatch(startAddRoute(values, navigate))
  
  
  return {
    groupRoutes,
    links,
    loading,
    addRoute
  };
};
