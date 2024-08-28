import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useState, useEffect } from "react";
import { themeSuperAdmin } from "../theme";
import { ThemeProvider } from "@mui/material";
import { NotFound } from "../pages/ui/NotFound";

const PublicRoutes = () => {
  const { loading, LoadPublicRoutes, PublicLinks, token } = useAuthStore();
  const [theme, setTheme] = useState(themeSuperAdmin);

  useEffect(() => {
    if (!token) {
      LoadPublicRoutes();
    }
  }, [token]);
  
  if (!loading) {
    
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          {
           PublicLinks()?.map((item, index)=>{
            return (
              <Route
              key={index}
              path={item.path}
              element={item.element}
              />
            )
           })
          }
           <Route path="/" element={<Navigate to="/login" replace />} />
           <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    );
  }
};

export default PublicRoutes;

