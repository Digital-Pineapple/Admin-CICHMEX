import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect, useState } from "react";
import {
  themeAdminCichmexLight,
  themeCarrierCichmex,
  themeSuperAdmin,
} from "../theme";
import { ThemeProvider } from "@mui/material";
import { Navbar } from "../components";
import  {Login}  from "../pages/Login";
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
  
  useEffect(() => {
    if(logged){
      dispatch(getNotificationsByUserId())
    }
  },[logged]);

  const { componentLinks, routes } = useAuthStore();
  const [theme, setTheme] = useState(themeSuperAdmin);
  useEffect(() => {
    if (logged = true) {
      
      const newTheme = valuateTheme(user?.type_user?.role);
      setTheme(newTheme);
    }
  }, [user]);

  const allMyRoutes = componentLinks(routes);

  const routesList = () => {
    return allMyRoutes.map((item) => (
      <Route path={item.path} element={item.element} key={item.path} />
    ));
  };

  const ThemesApp ={
    ['SUPER-ADMIN']: themeSuperAdmin,
    ['ADMIN']: themeAdminCichmexLight,
    ['CARRIER-DRIVER'] :themeCarrierCichmex,
  }
  const themeDefault = themeSuperAdmin

  const valuateTheme =(role)=>role ? ThemesApp[role] : themeDefault
  
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PublicRoutes logged={logged} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Route>

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
