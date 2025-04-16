import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect, useState } from "react";
import {
  themeAdminCichmexLight,
  themeCarrierCichmex,
  themeSuperAdmin,
  themeWarehousemanCichmex,
} from "../theme";
import { ThemeProvider } from "@mui/material";
import { Navbar } from "../components";
import { Login } from "../pages/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import Home from "../pages/Home";
import { useDispatch } from "react-redux";
import { getNotificationsByUserId } from "../store";
import io from "socket.io-client";
import { enqueueSnackbar } from "notistack";
import { addNotification } from "../store/reducer/notificationsReducer";

const RoutesContainer = ({ logged, user }) => {
  const dispatch = useDispatch();

  // Efecto para obtener notificaciones del usuario cuando está logueado
  useEffect(() => {
    if (logged) {
      dispatch(getNotificationsByUserId());
    }
  }, [logged]);

  const { componentLinks, routes } = useAuthStore();
  const [theme, setTheme] = useState(themeSuperAdmin);

  // Efecto para evaluar y establecer el tema según el rol del usuario
  useEffect(() => {
    if (logged === true) {
      const newTheme = valuateTheme(user?.type_user?.role);
      setTheme(newTheme);
    }
  }, [user]);

  // Genera las rutas dinámicas basadas en los permisos del usuario
  const allMyRoutes = componentLinks(routes);

  // Función para mapear las rutas dinámicas y renderizarlas
  const routesList = () => {
    return allMyRoutes.map((item) => (
      <Route path={item.path} element={item.element} key={item.path} />
    ));
  };

  // Diccionario de temas según el rol del usuario
  const ThemesApp = {
    ['SUPER-ADMIN']: themeSuperAdmin,
    ['ADMIN']: themeAdminCichmexLight,
    ['CARRIER-DRIVER']: themeCarrierCichmex,
    ['WAREHOUSEMAN']: themeCarrierCichmex,
    ['WAREHOUSE-MANAGER']: themeWarehousemanCichmex,
  };

  const themeDefault = themeSuperAdmin;

  // Función para evaluar el tema según el rol del usuario
  const valuateTheme = (role) => (role ? ThemesApp[role] : themeDefault);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoutes logged={logged} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Route>

        {/* Rutas privadas */}
        <Route
          element={
            logged ? (
              <Navbar>
                <PrivateRoutes logged={logged} />
              </Navbar>
            ) : (
              <PublicRoutes logged={logged} />
            )
          }
        >
          {routesList()}
          <Route path="/principal" element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default RoutesContainer;
