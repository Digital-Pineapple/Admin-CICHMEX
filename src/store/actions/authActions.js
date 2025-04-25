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
    let attempts = 0;
    const maxAttempts = 3;
    let isSuccess = false;

    while (attempts < maxAttempts && !isSuccess) {
      try {
        const { data } = await instanceApi.get("/auth/user", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        await dispatch(fetchRoutes(data.data.token));
        dispatch(onLogin(data.data.user));
        isSuccess = true;
        
      } catch (error) {
        // Si es error de autenticación (401), salimos inmediatamente
        if (error.response?.status === 401) {
          const errorMessage =
          error.response?.data?.message ||
          (error.response?.data?.errors?.[0]?.message) ||
          'Ocurrió un error inesperado';
        dispatch(onLogout(errorMessage));
          break;
        }

        // Verificamos si es un error recuperable (red o servidor)
        const isNetworkError = !error.response;
        const isServerError = error.response?.status >= 500;
        
        if (isNetworkError || isServerError) {
          attempts++;
          if (attempts < maxAttempts) {
            // Esperamos tiempo exponencial entre intentos (1s, 2s, 4s)
            await new Promise(resolve => 
              setTimeout(resolve, 1000 * Math.pow(2, attempts - 1)));
          }
        } else {
          const errorMessage =
          error.response?.data?.message ||
          (error.response?.data?.errors?.[0]?.message) ||
          'Ocurrió un error inesperado';
        dispatch(onLogout(errorMessage));
          break;
        }
      }
    }

    if (!isSuccess) {
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
