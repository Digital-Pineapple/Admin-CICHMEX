import { Navigate, Outlet } from "react-router-dom";

// Componente que define rutas públicas
// Si el usuario está autenticado (logged), redirige a una ruta específica (redirectTo)
// Si no está autenticado, renderiza los hijos o un Outlet para mostrar las rutas públicas
export const PublicRoutes = ({children, redirectTo="/principal", logged}) => {
  // Si el usuario está autenticado, redirige a la ruta especificada
  if( logged ) {
    return (
      <Navigate to={redirectTo} />
    );
  }
  // Si no está autenticado, renderiza los hijos o un Outlet
  return children ? children : <Outlet/>
};