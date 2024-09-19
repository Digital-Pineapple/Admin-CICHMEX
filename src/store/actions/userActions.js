import Cookies from "js-cookie";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteUser,
  editUser,
  loadUser,
  loadUsers,
  verifyUser,
} from "../reducer/userReducer";
import { enqueueSnackbar } from "notistack";
import { loadCarrierDriver, loadCarrierDrivers } from "../reducer";
import { headerConfigFormData } from "../../apis/headersConfig";
import { startLoading, stopLoading } from "../reducer/uiReducer";

const headerConfig = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/user", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadUsers(data.data));
    } catch (error) {
      enqueueSnackbar(`Error: ${error.response?.data.message}`);
    }
  };
};

export const getCarrierDrivers = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        "/user/carrier-driver/all",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(loadCarrierDrivers(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      dispatch(stopLoading())
    }
  };
};

export const getOneUser = (id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/user/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(loadUser(data.data));
  } catch (error) {
    console.log(error);
  }
};

export const startOneCarrierDriver = (id) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const { data } = await instanceApi.get(`/user/carrier-driver/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(loadCarrierDriver(data.data));
  } catch (error) {
    enqueueSnackbar(
      `${error.response.data.message}`,
      {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      }
    );
  }finally{
    dispatch(stopLoading())
  }
};

export const deleteOneUser = (_id) => async (dispatch) => {
  try {
    const {data} = await instanceApi.delete(
      `/user/delete-user/${_id}`,
      headerConfig
    );
    // dispatch(deleteUser(data.data._id));
    dispatch(deleteUser(_id))
    enqueueSnackbar(
      `${data.message}`,
      {
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      }
    );
  } catch (error) {
    console.log(error);
    enqueueSnackbar(`Error:${error.response}`);
  }
};

export const verifyOneUser = (id) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("accountVerified", true);
      const { data } = await instanceApi.put(
        `/user/validate/${id}`,
        formData,
        headerConfig
      );
      dispatch(verifyUser(data.data));
      enqueueSnackbar(`${data?.message || "Verificado con éxito"}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      stoptLoading();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Error: ${error.response.data.message || ""}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      stoptLoading();
    }
  };
};

export const editOneUser = (user_id, {fullname,type_user,profile_image}, navigate) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("type_user", type_user);
      formData.append("profile_image", profile_image);
      const { data } = await instanceApi.post(
        `/user/update/${user_id}`,
        formData,
        {
          headers: {
            "Content-Type": 'multipart/form-data',
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(editUser(user_id, data.data));
      enqueueSnackbar("Editado con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate('/usuarios',{ replace:true });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        `Ocurrió un error al actualizar la el servicio : ${error}`,
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }
  };
};

export const addOneCarrier = (values, navigate) => {
  return async (dispatch) => {
  
    try {
      const { data } = await instanceApi.post(
        `/user/carrier-driver`,
        { values: values },
        headerConfig
      );
      navigate("/usuarios/transportistas");
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      if (error) {
        
      }
    }
  };
};
