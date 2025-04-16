import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteBranch,
  loadBranch,
  loadBranches,
} from "../reducer/branchReducer";
import { headerConfig } from "./headers";

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Función para cargar todas las sucursales desde la API y almacenarlas en el estado global
export const startLoadBranches = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/branch-offices ");
      dispatch(loadBranches(data.data));
    } catch (error) {
      enqueueSnackbar(`Error ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

// Función para cargar una sucursal específica desde la API y almacenarla en el estado global
export const startLoadBranch = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/branch-offices/${id}`);
      dispatch(loadBranch(data.data));
    } catch (error) {
      enqueueSnackbar(`Error ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

// Función para verificar una sucursal, activarla y redirigir al usuario a otra página
export const startVerifyBranch = (_id, user_id, navigate) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("user_id", user_id);
      const { data } = await instanceApi.post(
        `/branch-offices/verify/${_id}`,
        formData,
        config
      );
      enqueueSnackbar("Activación exitosa", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/auth/Puntos-de-entrega", { replace: true });
    } catch (error) {
      enqueueSnackbar(`Error ${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
};

// Función para eliminar una sucursal desde la API y actualizar el estado global
export const startDeleteBranch = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/branch-offices/${id}`,headerConfig);
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      console.log(data.data);
      dispatch(deleteBranch(data.data));
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Error ${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
};
