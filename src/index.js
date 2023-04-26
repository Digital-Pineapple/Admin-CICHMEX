import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,createBrowserRouter,RouterProvider } from "react-router-dom";
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
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);