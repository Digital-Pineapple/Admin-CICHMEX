import { Navigate, Outlet } from "react-router-dom";

// Componente que define rutas privadas
export const PrivateRoutes = ({children, redirectTo="/login", logged}) => {

  // Si el usuario no está autenticado (logged es falso)
  if( !logged ) {
    // Redirige al usuario a la ruta especificada (por defecto "/login")
    return (
      <Navigate to={redirectTo} />
    );
  }

  // Si el usuario está autenticado, renderiza los hijos o un Outlet (subrutas)
  return children ? children : <Outlet/>
};
