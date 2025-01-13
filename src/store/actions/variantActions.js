import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import { onAddNewSizeVariant, updateVariant, updateVariantsImages } from "../reducer/productsReducer";
import Swal from "sweetalert2";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";


export const startUpdateOneVariant = (id, values, handleClose) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.post(`/variant-product/update/${id}`,{body: values}, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      handleClose()
      dispatch(updateVariant(data.data))
      Swal.fire({title:`${data.message}`, confirmButtonColor:green[500], icon:'success'})
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }finally{
        dispatch(stopLoading());
    }
  };
};
export const startUpdateMultipleImages = ({ product_id, images, color }, handleClose) => {
  
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const formData = new FormData();

      // Procesar imágenes
      for (const [index, image] of images.entries()) {
        if (image.filePreview.startsWith("https")) {
          formData.append(`images[${index}]`, image.filePreview);
        } else {
          formData.append(`images[${index}]`, image.file);
        }
      }

      // Agregar datos adicionales
      formData.append('product_id', product_id);
      formData.append('color', color);

      // Enviar solicitud
      const { data } = await instanceApi.post(
        `/variant-product/updateImages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({title:`${data.message}`, confirmButtonColor:green[500], icon:'success'})
      dispatch(updateVariantsImages(data.data))

      handleClose()
      
    } catch (error) {
      console.log(error);
      
      enqueueSnackbar(`${error.response?.data?.message || "Error desconocido"}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startAddVariantsize = (info, handleClose) => {
  
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.post(
        `/variant-product/addVariant/newSize`,
        {body: info},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      handleClose()
      dispatch(onAddNewSizeVariant(data.data))
      Swal.fire({title:`${data.message}`, confirmButtonColor:green[500], icon:'success'})
      
    } catch (error) {
      enqueueSnackbar(`${error.response?.data?.message || "Error desconocido"}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

