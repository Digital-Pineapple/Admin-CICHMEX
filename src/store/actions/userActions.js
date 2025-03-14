import { instanceApi } from "../../apis/configAxios";
import {
  deleteUser,
  editUser,
  loadUser,
  loadUsers,
  verifyUser,
} from "../reducer/userReducer";
import { enqueueSnackbar } from "notistack";
import { loadCarrierDriver, loadCarrierDrivers, deleteCarrierDriver as DeleteCarrierDriver, loadAllOptimizedRoutes, onLoadAllWarehouseman, onLoadOneWarehouseman } from "../reducer";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import Swal from "sweetalert2";


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
      
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      
    }
  };
};

export const getAllWarehouseman = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        "/user/warehouseman/all",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(onLoadAllWarehouseman(data.data));
    } catch (error) {
     console.log(error); 
    } finally{
      dispatch(stopLoading())
    }
  };
};

export const startCreateWarehouseman = (values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.post(
        "/user/warehouseman",{values: values},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({title:`${data.message}`, icon:'success'})
      navigate(`/usuarios/almacenistas`,{replace:true})
    } catch (error) {
     console.log(error);
     
    } finally{
      dispatch(stopLoading())
    }
  };
};

export const deleteCarrierDriver = (id) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.delete(
        `/user/carrier-driver/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      dispatch(DeleteCarrierDriver(data.data))
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }finally{
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
    const { data } = await instanceApi.get(`/user/allInfo/${id}`, {
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

export const startOneWarehouseman = (id) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const { data } = await instanceApi.get(`/user/allInfo/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(onLoadOneWarehouseman(data.data));
  } catch (error) {
    console.log(error);
  }finally{
    dispatch(stopLoading())
  }
};

export const startUpdateWarehouseman = (id, values,navigate) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const { data } = await instanceApi.put(`/user/warehouseman/update/${id}`,{values:values}, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    Swal.fire({title:`${data.message}`, icon:'success'})
    navigate(`/usuarios/almacenistas`,{replace:true})
  } catch (error) {
    console.log(error);
  }finally{
    dispatch(stopLoading())
  }
};

export const deleteOneUser = (_id) => async (dispatch) => {
  try {
    const {data} = await instanceApi.delete(
      `/user/delete-user/${_id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
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
    dispatch(startLoading())
    try {
      const formData = new FormData();
      formData.append("accountVerified", true);
      const { data } = await instanceApi.put(
        `/user/validate/${id}`,
        formData,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(verifyUser(data.data));
      enqueueSnackbar(`${data?.message || "Verificado con éxito"}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Error: ${error.response.data.message || ""}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }finally{
      dispatch(stopLoading())
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
    console.log(values);
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.post(
        `/user/carrier-driver`,
        { values: values },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
    }finally{
      dispatch(stopLoading())
    }

  };
};
export const updateOneCarrier = (id,values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.post(
        `/user/carrier-driver/update/${id}`,
        { values: values },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
    }finally{
      dispatch(stopLoading())
    }

  };
};

export const startLoadOptimizedRoutes = (myCoords) => {
  
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(
        `/product-order/optimation/RouteDelivery`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
           params:{
            coords: myCoords
          }
        }
      );
      const {info, waypoints, totalDistance, totalDuration} = data.data
      
      
      const routeData = {
        origin: info.routes[0].legs[0].start_location,
        destination: info.routes[0].legs[0].end_location,
        steps: info.routes[0].legs[0].steps.map((step) => ({
          polyline: step.polyline.points,
          instructions: step.html_instructions,
        })),
        overviewPolyline: info.routes[0].overview_polyline.points,
        waypoints: waypoints,
        totalDistance,
        totalDuration,
        points: info.routes[0].legs

      };
      dispatch(loadAllOptimizedRoutes(routeData))
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
    }finally{
      dispatch(stopLoading())
    }

  };
};

