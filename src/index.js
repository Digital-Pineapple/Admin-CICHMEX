import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Root from './Pages/Root';
import ErrorPage from './error-page';
import Servicios from './Pages/Services/Index';
import NewService from './Pages/Services/Create';
import EditService from './Pages/Services/Edit';
import Usuarios from './Pages/Usuarios/Index';
import NewUser from './Pages/Usuarios/Create'
import EditUser from './Pages/Usuarios/Edit';
import TypeCar from './Pages/TypeCar/Index';
import Alerta from './ui/SuccesAlert';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "Alerta",
    element: <Alerta/>,
  },


  {
    path: "Usuarios",
    element: <Usuarios/>
  },
  {
    path: "Nuevo-usuario",
    element: <NewUser/>
  },
  {
    path: "Editar-usuario",
    element: <EditUser/>
  },


  {
    path: "Servicios",
    element: <Servicios/>
  },
  {
    path: "Nuevo-servicio",
    element: <NewService/>
  },
  {
    path: "Editar-servicio",
    element: <EditService/>
  },



  {
    path: "Tipo-de-carro",
    element: <TypeCar/>
  },



]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);