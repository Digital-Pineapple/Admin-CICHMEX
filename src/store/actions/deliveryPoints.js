import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { loadDeliveryPoint, loadDeliveryPoints, deleteDeliveryPoint, setLoading, toggleBranch, deleteDeliveryPointImage } from "../reducer/deliveryPointsReducer";
import Swal from "sweetalert2";

export const getPoints = () => {
  return async (dispatch) => {
    try {      
      const { data } = await instanceApi.get("/branch-offices");
      await dispatch(loadDeliveryPoints(data.data));
    } catch (error) {
      enqueueSnackbar("Error al obtener los puntos de entrega", {
        variant: "error",
      });
    }
  };
};


export const getDeliveryPoint = (id, callback) => {
  return async (dispatch) => {
    try {
      await dispatch(setLoading(true));
      const { data } = await instanceApi.get(`/branch-offices/${id}`);
      await dispatch(loadDeliveryPoint(data.data));     
      callback(data.data) 
      // return data.data;
    } catch (error) {
      console.error("la sucursal no existe ", error);
    }finally{
      await dispatch(setLoading(false));
    }
  };
};


export const updateDeliveryPoint = ( id, infoBranch, coords, schedules , images, navigate ) => {
  const { lat, lng } = coords  
  const { name, description, zipcode: cp, neighborhood, phone, state_id, state, municipality_id, municipality, direction } = infoBranch;
  return async (dispatch) => {    
    const location = {
      state_id,
      state,
      municipality_id,
      municipality,
      lat,
      lgt: lng,
      direction,
      cp,
      neighborhood,
    };
    const locationParsed = JSON.stringify(location);
    const formData = new FormData();    
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", locationParsed);        
    formData.append("phone_number", phone);
    formData.append("schedules", JSON.stringify(schedules));
    formData.append("tag", "cichmex");
    formData.append("type", "deliverypoint");  
    images.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });
    try {
      await dispatch(setLoading(true));
      await instanceApi.patch(`/branch-offices/${id}`, formData, {
        headers: {          
          "Content-Type": "multipart/form-data",
        },
      });      
      navigate("/puntos-entrega/todos");
      enqueueSnackbar(`Sucursal actualizada con exito`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al editar la sucursal ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }finally{
      await dispatch(setLoading(false))

    }
  };
};

export const loadSucursalRegister = ( branchData, coords, schedules, images, navigate ) => {    
  const { name, description, phone, state, municipality, direction, neighborhood, zipcode } = branchData;
  const  { lat, lng } = coords;
  return async (dispatch) => {
    try { 
      await dispatch(setLoading(true))     
      const formData = new FormData();
      const lgt = lng;      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", JSON.stringify({ state, municipality, lat, lgt, direction, neighborhood, cp: zipcode }));
      formData.append("schedules", JSON.stringify(schedules));
      formData.append("type", "deliverypoint");      
      formData.append("phone_number", phone);   
      formData.append("tag", "cichmex");
      for(let i =0; i < images.length; i++) {
        formData.append("images", images[i]);
      }            
      const info = await instanceApi.post("/branch-offices", formData, {
        headers: {         
         "Content-Type": "/multipart/form-data",
        }
      });
      enqueueSnackbar(`Registro exitoso: ${info.data?.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      navigate("/puntos-entrega/todos");
      return info.data.data.activated;
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error ${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }finally{
      await dispatch(setLoading(false))
    }
  };
};

export const handleDeleteDeliveryPoint = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(`/branch-offices/${id}`);
      await dispatch(deleteDeliveryPoint(id))
      Swal.fire("Sucursal eliminada con exito", "", "success");              
    } catch (error) {
      console.error(error);
      Swal.fire(`${error.response.data?.message || "Ocurrio un error"}`, "", "error");
    }
  };
};

export const activateDeliveryPoint = (id, name= "") => {
  return async (dispatch) => {
    Swal.fire({
      title: `Activar ${name} sucursal`,
      text: `Quieres activar la sucursal ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, activar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(setLoading(true));
          const { data } = await instanceApi.post(`/branch-offices/verify/${id}`);
          await Swal.fire({            
            text: "Sucursal activada",
            icon: "success",
            timer: 2000, // Se cierra automáticamente en 3 segundos
            // timerProgressBar: true, // Muestra una barra de progreso
          });     
          await dispatch(toggleBranch(data.data))
          // Dispatch any necessary reducer action here
        } catch (error) {
          Swal.fire({
            text: `${error.response.data?.message} || Hubo un error`,
            icon: "error",
            timer: 2000, // Se cierra automáticamente en 3 segundos
            // timerProgressBar: true, // Muestra una barra de progreso
          })  
        } finally {
          await dispatch(setLoading(false));
        }
      }
    });
  }
   
}



export const desactivateDeliveryPoint = (id, name = "") => {
  return async (dispatch) => {
    Swal.fire({
      title: `Desactivar ${name} sucursal`,
      text: `Seguro que quieres desactivar la sucursal?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(setLoading(true));
          const { data } = await instanceApi.post(`/branch-offices/desactivate/${id}`);
          await Swal.fire({            
            text: "La sucursal se desactivo",
            icon: "success",
            timer: 2000, // Se cierra automáticamente en 3 segundos
            // timerProgressBar: true, // Muestra una barra de progreso
          });       
          // Dispatch any necessary reducer action here
          await dispatch(toggleBranch(data.data))
        } catch (error) {
          Swal.fire({
            text: `${error.response.data?.message} || Hubo un error`,
            icon: "error",
            timer: 2000, // Se cierra automáticamente en 3 segundos
            // timerProgressBar: true, // Muestra una barra de progreso
          })        
        } finally {
          await dispatch(setLoading(false));
        }
      }
    });
  }   
}

export const loadVerifyQROrder = ({ order, user, code } ) => {    
  return async (dispatch) => {
    try {        
      const body = { order_id: order, user_id: user, v_code: code }
      const response = await instanceApi.post(`/product-order/start-verifyQr`, body);
      const id = response.data.data._id
      Swal.fire({
        title: `Entrega de pedido${response.data.data.order_id}`,
        text: 'Se validó codigo correctamente',
        showCancelButton: false,
        confirmButtonText: "Terminar entrega",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(doneDelivery(id));        
        }
      });
    } catch (error) {
      Swal.fire({
        text: `${error.response.data?.message} || Hubo un error`,
        icon: "error",
        timer: 2000, // Se cierra automáticamente en 3 segundos
        // timerProgressBar: true, // Muestra una barra de progreso
      })       
    }
  };
};

export const doneDelivery = (order_id, notes = "El pedido fue entregado") => {    
  return async (dispatch) => {
    try {      
      const body =  { _id: order_id, notes: notes }     
      const response = await instanceApi.post(`/product-order/end-shipping`, body);
      Swal.fire({
        title: `Se entrego el pedido con éxito`,
      });
      // dispatch(deleteDeliveredOrder(order_id));
    } catch (error) {
      Swal.fire({
        text: `${error.response.data?.message} || Hubo un error`,
        icon: "error",
        timer: 2000, // Se cierra automáticamente en 3 segundos
        // timerProgressBar: true, // Muestra una barra de progreso
      })    
    }
  };
};

export const deleteBranchImage = (branch_id, image_id) => {
  return async (dispatch) => {
    Swal.fire({
      title: `Quieres eliminar esta imagen`,      
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = { image_id: image_id }
           await instanceApi.put(`/branch-offices/image/${branch_id}`, body, {
             headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
             }
           });     
           await dispatch(deleteDeliveryPointImage(image_id));       
        } catch (error) {
          Swal.fire({
            text: `Hubo un error`,
            icon: "error",
            timer: 2000, // Se cierra automáticamente en 3 segundos
            // timerProgressBar: true, // Muestra una barra de progreso
          })            
        }
      }
    });
  
  }
}







