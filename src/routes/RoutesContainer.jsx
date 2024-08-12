import { AllRoutes } from "../routes/AllRoutes";
import { NavbarParthners } from "../components/Navbar/NavbarParthners";
import { Route, Routes } from "react-router-dom";
import PublicPages from "./PublicPages";
import PrivateRoutes from "./PrivateRoutes";
import { FooterParthners, Navbar } from "../components";
import { Links, LinksAdminCichmex } from "./Links";
import { useAuthStore } from "../hooks";
import { useState, useEffect } from "react";
import { themeAdminCarWashLight, themeAdminCichmexLight, themeSuperAdmin } from "../theme";
import { ThemeProvider } from "@mui/material";
import LoadingScreenBlue from "../components/ui/LoadingScreenBlue";

const RoutesContainer = () => {
  const { user, logged } = useAuthStore();
  const [theme, setTheme] = useState(themeSuperAdmin);
  const [links, setLinks] = useState(null);
  

  useEffect(() => {
    const valuateLinks = () => {
      const system = user.type_user?.system;
      console.log(system);
      
      if (system[0] === 'CICHMEX' && system[1] === "CARWASH") {
        setTheme(themeSuperAdmin);
        setLinks(Links);
      } else if (system[0] === 'CICHMEX') {
        setLinks(LinksAdminCichmex);
        setTheme(themeAdminCichmexLight);
      } else if (system[0] === "CARWASH") {
        setTheme(themeAdminCarWashLight);
        setLinks(); // Asegúrate de definir los links correctos para CARWASH si son diferentes
      }
    };

    if (logged) {
      valuateLinks()
    } 
  }, [user, logged]);
  
  if (theme === null) {
    return<LoadingScreenBlue/>
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/*"
          element={
            <PublicPages>
              <Routes>
                {AllRoutes.filter(({ type }) => type === 0).map(
                  ({ path, element }, index) => (
                    <Route path={path} element={element} key={index} />
                  )
                )}
              </Routes>
            </PublicPages>
          }
        />
        <Route
          path="/auth/*"
          element={
            <PrivateRoutes>
              <Navbar navLinks={links ? links :[]}>
                <Routes>
                  {AllRoutes.filter(({ type }) => type === 1).map(
                    ({ path, element }, index) => (
                      <Route path={path} element={element} key={index} />
                    )
                  )}
                </Routes>
              </Navbar>
            </PrivateRoutes>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default RoutesContainer;
