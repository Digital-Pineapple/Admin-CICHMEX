import { useDispatch, useSelector } from "react-redux";
import {
  startChangePassword,
  startLogin,
  startLogout,
  startRevalidateToken,
} from "../store";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";
import { useMemo } from "react";

export const useAuthStore = () => {
  // Obtiene el estado del usuario, si está logueado y las rutas desde el estado global (Redux)
  const { user, logged, routes } = useSelector((state) => state.auth);
  // Obtiene el estado de carga desde el estado global (Redux)
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para iniciar sesión, recibe email, contraseña y captcha, y utiliza el dispatch para ejecutar la acción correspondiente
  const StartLogin = async (email, password, captcha) =>
    dispatch(startLogin(email, password, captcha, navigate));

  // Función para revalidar el token del usuario, utiliza el dispatch para ejecutar la acción correspondiente
  const RevalidateToken = async () => dispatch(startRevalidateToken(navigate));

  // Función para cargar rutas públicas (aunque no está definida en el código actual)
  const LoadPublicRoutes = async () => dispatch(startPublicLinks());

  // Función para cerrar sesión, utiliza el dispatch para ejecutar la acción correspondiente
  const loadLogout = async () => dispatch(startLogout(navigate));

  // Función para cambiar la contraseña, recibe los valores del formulario y una función para cerrar el modal
  const changePassword = (values, handleClose) =>
    dispatch(startChangePassword(values, handleClose));

  // Función para generar los enlaces de los componentes basados en las rutas disponibles
  const componentLinks = (routes) => {
    // Busca la ruta de "No encontrado" en caso de que no haya coincidencias
    const routeNotFound = AllRoutes.find((e) => e.id === 1);
    // Mapea las rutas disponibles y genera un objeto con la información del enlace
    const elLink = routes.map((rdb) => {
      const matchedComponent = AllRoutes.find((i) => i.id === rdb.component);
      return {
        path: rdb.path, // Ruta del enlace
        name: rdb.name, // Nombre del enlace
        element: matchedComponent
          ? matchedComponent?.element // Componente asociado si existe
          : routeNotFound?.element, // Componente "No encontrado" si no hay coincidencia
      };
    });
    return elLink;
  };

  // Retorna todas las funcionalidades y estados para ser utilizados en los componentes
  return {
    user, // Información del usuario
    logged, // Estado de si el usuario está logueado
    routes, // Rutas disponibles
    navigate, // Navegador para redirigir entre rutas
    StartLogin, // Función para iniciar sesión
    RevalidateToken, // Función para revalidar el token
    LoadPublicRoutes, // Función para cargar rutas públicas
    loadLogout, // Función para cerrar sesión
    componentLinks, // Función para generar enlaces de componentes
    loading, // Estado de carga
    changePassword, // Función para cambiar la contraseña
  };
};
