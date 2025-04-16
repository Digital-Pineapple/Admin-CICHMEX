import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import ServicesProvider from "./providers/ServicesProvider";

// Renderiza la aplicación principal en el elemento con id "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> // Modo estricto de React (comentado en este caso)
    <Provider store={store}> 
        {/* Proveedor de Redux para manejar el estado global de la aplicación */}
        <BrowserRouter> 
            {/* Proveedor de enrutamiento para manejar las rutas de la aplicación */}
            <CssBaseline />
            {/* CssBaseline aplica un estilo base consistente en toda la aplicación */}
            <SnackbarProvider hideIconVariant maxSnack={3} autoHideDuration={3000}>
                {/* Proveedor de notificaciones (snackbars) con configuración personalizada */}
                <GoogleOAuthProvider clientId="31469844821-jbunp9ilg10vvla8ojd6ihr79ogu12ve.apps.googleusercontent.com">
                    {/* Proveedor para la autenticación con Google OAuth */}
                    <ServicesProvider>
                        {/* Proveedor de servicios personalizados para la aplicación */}
                        <App />
                        {/* Componente principal de la aplicación */}
                    </ServicesProvider>
                </GoogleOAuthProvider>
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
