import { replace } from "formik";
import { instanceApi } from "../../apis/configAxios";
import { onLogin, onLogout } from "../reducer/authReducer";
import { setLinks, startLoading, stopLoading } from "../reducer/uiReducer";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { AllRoutes } from "../../routes/AllRoutes";
import { enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";

// Función para obtener las rutas dinámicas del sistema
export const fetchRoutes = createAsyncThunk('/auth/fetchRoutes', async (token) => {
  const { data } = await instanceApi.get(`/dynamic-route/links/all`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      system: "Admin"
    }
  });
  return data.data;
});

// Función para iniciar sesión
export const startLogin = (email, password, captcha, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading()); // Inicia el estado de carga
    try {
      const { data } = await instanceApi.post("/auth/login", {
        email: email,
        password: password,
        captchaToken: captcha,
      });

      // Guarda el token en el almacenamiento local
      localStorage.setItem("token", data.data.token);

      // Actualiza el estado con la información del usuario
      dispatch(onLogin(data.data.user));

      // Obtiene las rutas dinámicas
      await dispatch(fetchRoutes(data.data.token));

      // Navega a la página principal
      navigate("/principal", { replace: true });

    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading()); // Detiene el estado de carga
    }
  };
};

// Función para revalidar el token del usuario
export const startRevalidateToken = (navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/auth/user", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Obtiene las rutas dinámicas
      await dispatch(fetchRoutes(data.data.token));

      // Actualiza el estado con la información del usuario
      dispatch(onLogin(data.data.user));
    } catch (error) {
      // Manejo de errores y cierre de sesión si el token no es válido
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.errors?.[0]?.message) ||
        'Ocurrió un error inesperado';
      dispatch(onLogout(errorMessage));
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  };
};

// Función para cerrar sesión
export const startLogout = (navigate) => {
  return async (dispatch) => {
    dispatch(startLoading()); // Inicia el estado de carga
    try {
      // Limpia el estado y el almacenamiento local
      dispatch(onLogout());
      localStorage.clear();

      // Navega a la página de inicio de sesión
      navigate('/login', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading()); // Detiene el estado de carga
    }
  }
}

// Función para cambiar la contraseña del usuario
export const startChangePassword = ({ oldPassword, newPassword }, onCloseModal) => {
  return async (dispatch) => {
    dispatch(startLoading()); // Inicia el estado de carga
    try {
      const { data } = await instanceApi.put(
        "/auth/change/password/admin",
        {},
        {
          params: {
            password: oldPassword,
            new_password: newPassword
          },
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Cierra el modal después de cambiar la contraseña
      onCloseModal();

      // Muestra un mensaje de éxito
      Swal.fire({ title: `${data.message}`, icon: 'success', confirmButtonColor: 'green' });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading()); // Detiene el estado de carga
    }
  }
}
