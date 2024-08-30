import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect, useState } from "react";
import { themeAdminCarWashLight, themeAdminCichmexLight, themeSuperAdmin } from "../theme";
import { ThemeProvider } from "@mui/material";
import { NotFound } from "../pages/ui/NotFound";
import { Navbar } from "../components";
import { useDynamicRoutes } from "../hooks/useDynamicRoutes";
import LoadingScreenBlue from "../components/ui/LoadingScreenBlue";
const RoutesContainer = () => {
  const { logged, user } = useAuthStore();
  const { componentLinks } = useDynamicRoutes();
  const [theme, setTheme] = useState(themeSuperAdmin);
  
  const valuateTheme = () => {
    const system = user?.type_user?.system || [];
    let newTheme = themeSuperAdmin;

    if (system.includes('CICHMEX') && system.includes("CARWASH")) {
      newTheme = themeSuperAdmin;
    } else if (system.includes('CICHMEX')) {
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
        {componentLinks?.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}

        {logged ? (
          <>
            {componentLinks?.map((item, index) => (
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
            <Route path="/" element={<Navigate to="/principal" replace />} />
            <Route path="*" element={<Navigate to="/principal" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
};

export default RoutesContainer;
