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
  const { user, logged, componentLink } = useAuthStore();
  const [theme, setTheme] = useState(themeSuperAdmin);

  const valuateLinks = () => {
    const system = user.type_user?.system;
    if (system[0] === 'CICHMEX' && system[1] === "CARWASH") {
      setLinks(Links);
    } else if (system[0] === 'CICHMEX') {
      setTheme(themeAdminCichmexLight);
    } else if (system[0] === "CARWASH") {
      setTheme(themeAdminCarWashLight);
    }
  };

  useEffect(() => {
    if (logged) {
      valuateLinks()
    } 
  }, [user, logged]);
  console.log(componentLink);
  

  return (

    <ThemeProvider theme={theme}>
    <Routes>
      <Route
        path="/*"
        element={
            <Routes>
              {componentLink.map((item, index)=>{
                return (
                  <Route 
                  path={item.path}
                  element={item.component}
                  key={index}
                  />
                )
              })}
            </Routes>
        }
      />
    </Routes>
  </ThemeProvider>
  );
};

export default RoutesContainer;
