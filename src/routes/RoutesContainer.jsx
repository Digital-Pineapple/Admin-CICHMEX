import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect, useState } from "react";
import {
  themeAdminCarWashLight,
  themeAdminCichmexLight,
  themeSuperAdmin,
} from "../theme";
import { ThemeProvider } from "@mui/material";
import { Navbar } from "../components";
import { Login } from "../pages/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import Home from "../pages/Home";

const RoutesContainer = ({ logged, user }) => {
  const { componentLinks, routes } = useAuthStore();
  const [theme, setTheme] = useState(themeSuperAdmin);

  useEffect(() => {
    if (user) {
      const newTheme = valuateTheme(user);
      setTheme(newTheme);
    }
  }, [user]);

  const allMyRoutes = componentLinks(routes);

  const routesList = () => {
    return allMyRoutes.map((item) => (
      <Route path={item.path} element={item.element} key={item.path} />
    ));
  };

  const valuateTheme = (user) => {
    const system = user?.type_user?.system || [];
    if (system.includes("CICHMEX") && system.includes("CARWASH")) {
      return themeSuperAdmin;
    } else if (system.includes("CICHMEX")) {
      return themeAdminCichmexLight;
    } else if (system.includes("CARWASH")) {
      return themeAdminCarWashLight;
    }
    return themeSuperAdmin;
  };

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
