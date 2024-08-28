import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useState, useEffect } from "react";
import { themeAdminCarWashLight, themeAdminCichmexLight, themeSuperAdmin } from "../theme";
import { ThemeProvider } from "@mui/material";
import { NotFound } from "../pages/ui/NotFound";
import { Navbar } from "../components";
import LoadingScreenBlue from "../components/ui/LoadingScreenBlue";

export const PrivateRoutes = () => {
  const { user, PrivateLinks, logged, loading } = useAuthStore();
  const [theme, setTheme] = useState(themeSuperAdmin);

  useEffect(() => {
    valuateLinks();
  }, [user]);

  const valuateLinks = () => {
    const system = user?.type_user?.system || [];
    let newTheme = themeSuperAdmin;
    if (system[0] === 'CICHMEX' && system[1] === "CARWASH") {
      newTheme = themeSuperAdmin;
    } else if (system[0] === 'CICHMEX') {
      newTheme = themeAdminCichmexLight;
    } else if (system[0] === "CARWASH") {
      newTheme = themeAdminCarWashLight;
    }

    if (newTheme !== theme) {
      setTheme(newTheme);
    }
  };
  if (logged) {
    
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          {
           PrivateLinks()?.map((item, index)=>{
            return (
              <Route
              key={index}
              path={item.path}
              element={<Navbar
              navLinks ={item}
              user={user}
              >
                {item.element}
              </Navbar>}
              />
            )
           })
          }
           <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    );
  }else{
    return(
      <LoadingScreenBlue/>
    )
  }
};
