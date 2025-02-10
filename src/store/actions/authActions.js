import { replace } from "formik";
import { instanceApi } from "../../apis/configAxios";
import { onLogin, onLogout } from "../reducer/authReducer";
import { setLinks, startLoading, stopLoading } from "../reducer/uiReducer";
import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import { AllRoutes } from "../../routes/AllRoutes";
import { enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";

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

export const startLogin = (email, password, captcha, navigate) => {

  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.post("/auth/admin/login", {
        email: email,
        password: password,
        captchaToken: captcha,
      });

      localStorage.setItem("token", data.data.token);
      dispatch(onLogin(data.data.user));
      await dispatch(fetchRoutes(data.data.token));
      navigate("/principal", { replace: true });

    } catch (error) {
      console.log(error);

    } finally {
      dispatch(stopLoading());
    }
  };
};


export const startRevalidateToken = (navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/auth/user", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await dispatch(fetchRoutes(data.data.token));
      dispatch(onLogin(data.data.user));
    } catch (error) {
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

export const startLogout = (navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(onLogout());
      localStorage.clear();
      navigate('/login', { replace: true })
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }
}

export const startChangePassword = ({ oldPassword, newPassword }, onCloseModal) => {
  return async (dispatch) => {
    dispatch(startLoading());
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
      onCloseModal()
      Swal.fire({ title: `${data.message}`, icon: 'success', confirmButtonColor: 'green' })
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }
}
