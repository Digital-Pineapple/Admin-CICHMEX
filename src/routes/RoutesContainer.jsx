import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect, useMemo, useState } from "react";
import {
  themeAdminCarWashLight,
  themeAdminCichmexLight,
  themeSuperAdmin,
} from "../theme";
import { ThemeProvider } from "@mui/material";
import { NotFound } from "../pages/ui/NotFound";
import { Navbar } from "../components";
import { useDynamicRoutes } from "../hooks/useDynamicRoutes";
import LoadingScreenBlue from "../components/ui/LoadingScreenBlue";
import { Login } from "../pages/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import Principal from "../pages/Principal";
import { PublicRoutes } from "./PublicRoutes";
const RoutesContainer = () => {
  const { logged, user, routes } = useAuthStore();

  const { componentLinks } = useDynamicRoutes();
  const [theme, setTheme] = useState(themeSuperAdmin);

  useEffect(() => {
    function valuateLayout() {
      if (!!user && !!routes) {
        valuateTheme();
      }
    }
    valuateLayout();
  }, [user, routes]);

  const match = useMemo(() => componentLinks(routes), [routes]);

  const routesList = () => {
    const list = match.map((item, index) => {
      return <Route path={item.path} element={item.element} key={index} />;
    });
    return list;
  };

  const valuateTheme = () => {
    const system = user?.type_user?.system || [];
    let newTheme = themeSuperAdmin;

    if (system.includes("CICHMEX") && system.includes("CARWASH")) {
      newTheme = themeSuperAdmin;
    } else if (system.includes("CICHMEX")) {
      newTheme = themeAdminCichmexLight;
    } else if (system.includes("CARWASH")) {
      newTheme = themeAdminCarWashLight;
    }

    if (newTheme !== theme) {
      setTheme(newTheme);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PublicRoutes isAllowed={!!logged} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Route>
        <Route
          element={
            <Navbar>
              <PrivateRoutes isAllowed={!!logged} redirectTo="/principal" />
            </Navbar>
          }
        >
          {routesList()}
          <Route path="/principal" element={<Principal />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default RoutesContainer;
