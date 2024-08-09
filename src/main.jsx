import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {  CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import ServicesProvider from "./providers/ServicesProvider";



ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter> 
            <CssBaseline />
            <SnackbarProvider  hideIconVariant  maxSnack={3} autoHideDuration={3000}>
            <GoogleOAuthProvider clientId="31469844821-jbunp9ilg10vvla8ojd6ihr79ogu12ve.apps.googleusercontent.com">
             <ServicesProvider>
              <App  />
             </ServicesProvider>
            </GoogleOAuthProvider>
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
