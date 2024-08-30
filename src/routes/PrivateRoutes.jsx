import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useState, useEffect, useMemo } from "react";
import { themeAdminCarWashLight, themeAdminCichmexLight, themeSuperAdmin } from "../theme";
import { ThemeProvider } from "@mui/material";
import { NotFound } from "../pages/ui/NotFound";
import { Navbar } from "../components";
import LoadingScreenBlue from "../components/ui/LoadingScreenBlue";
import { AllRoutes } from "./AllRoutes";
import { useDynamicRoutes } from "../hooks/useDynamicRoutes";

export const PrivateRoutes = () => {
  const { user, logged } = useAuthStore();
  const {links,loadPrivateLinks, componentLinks} =  useDynamicRoutes()
  const [theme, setTheme] = useState(themeSuperAdmin);

  useEffect(() => {
    valuateLinks();
    loadPrivateLinks()
  }, []);
  

 

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {componentLinks(links)?.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              <Navbar>
                {item.element}
              </Navbar>
            }
          />
        ))}
        {logged && <Route path="*" element={<Navigate to="/principal" replace />} />}
        
        {!logged && <Route path="/" element={<Navigate to="/login" replace />} />}
        <Route path="/" element={<Navigate to="/principal" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};
