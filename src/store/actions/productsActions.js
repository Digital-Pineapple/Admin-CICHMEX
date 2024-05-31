import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteProduct,
  editProduct,
  loadProduct,
  loadProducts,
  onAddNewProduct,
  productsReducer,
  startLoading,
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
}
export const startLoadStockProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/stock-StoreHouse/available/ok`,
        headerConfigApplication
      );
      const info = data.data.map((item, index)=>{
        const info = item.product_id
        const stock = item.stock
        const totInfo = {...info,stock}
        return totInfo
      })
      dispatch(loadProducts(info));
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
        dispatch(startLoading());
        const { data } = await instanceApi.get(
          `/product/${_id}`, headerConfigApplication );
        dispatch(loadProduct(data.data));
        return data;
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
  ({name,price,description, tag, size, category, subCategory}, images, navigate) => async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("description",description)
      formData.append("tag", tag)
      formData.append("size", size)
      formData.append("subCategory", subCategory)
      formData.append("category", category)
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
  (id,{name,price,description,tag, size, category, subCategory}, images, navigate) => async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('description',description)
      formData.append('tag', tag)
      formData.append('size', size)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
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
