import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteProduct,
  editProduct,
  loadProduct,
  loadProducts,
  onAddNewProduct,
  productsReducer,
} from "../reducer/productsReducer";
import {
  headerConfigApplication,
  headerConfigForm,
  headerConfigFormData,
} from "../../apis/headersConfig";

export const startLoadProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product`,
        headerConfigApplication
      );
      dispatch(loadProducts(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
  };
};

export const LoadOneProduct = (_id) => {
 
  return async (dispatch) => {
    if (typeof _id == "string") {   
      try {
        const { data } = await instanceApi.get(
          `/product/${_id}`, headerConfigApplication );
        dispatch(loadProduct(data.data));
      } catch (error) {
        enqueueSnackbar(
          `${error.response.data.message}|| 'Error al consultar información'`,
          {
            anchorOrigin: { horizontal: "center", vertical: "top" },
            variant: "error",
          }
        );
      }
    }
  };
};

export const addOneProduct =
  ({name,price,description, tag, size}, images, navigate) => async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("description",description)
      formData.append("tag", tag)
      formData.append("size", size)
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const { data } = await instanceApi.post(
        `/product`,
        formData, headerConfigFormData);
      dispatch(addOneProduct(data.data));
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/productos", { replace: true });
    } catch (error) {
      enqueueSnackbar(`Error: ${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  export const editOneProduct =
  (id,{name,price,description,tag, size}, images, navigate) => async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('description',description)
      formData.append('tag', tag)
      formData.append('size', size)
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const { data } = await instanceApi.post(
        `/product/${id}`,
        formData,headerConfigFormData);
      dispatch(editProduct(data.data));
      enqueueSnackbar("Editado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/productos", { replace: true });
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error + ${error.response.data.message}` , {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

export const deleteOneProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/product/${id}`, headerConfigApplication);
      dispatch(deleteProduct(data.data?._id));
      enqueueSnackbar("Producto eliminado", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Ocurrió un error + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
