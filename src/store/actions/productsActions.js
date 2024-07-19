import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteProduct,
  editProduct,
  loadProduct,
  loadProductEntries,
  loadProducts,
  loadStockProducts,
  onAddNewProduct,
  productsReducer,
  startLoading,
  stopLoading,
} from "../reducer/productsReducer";
import {
  headerConfigApplication,
  headerConfigForm,
  headerConfigFormData,
} from "../../apis/headersConfig";
import Swal from "sweetalert2";
import { headerConfig } from "./headers";

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
        const stock_id = item._id
        const totInfo = {...info,stock, stock_id}
        return totInfo
      })
      dispatch(loadStockProducts(info));
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

export const startLoadNonExistProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product/non-existent/get`,
        headerConfigApplication
      );
      dispatch(loadProducts(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}`||'Error al consultar la información',
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
  };
};

export const startLoadEntriesProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/stock-StoreHouse/product/entries`,
        headerConfig
      );
      dispatch(loadProductEntries(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}`||'Error al consultar la información',
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
  ({name,price,description, tag, size, category, subCategory, weight, video}, images, navigate) => async (dispatch) => {
    dispatch(startLoading())
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("tag", tag);
      formData.append("size", size);
      formData.append("subCategory", subCategory);
      formData.append("category", category);
      formData.append("weight", weight);
      formData.append("video", video);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      
      const { data } = await instanceApi.post(
        `/product/create-product/ok`,
        formData,
        headerConfigFormData
      );
      dispatch(onAddNewProduct(data.data));
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/productos", { replace: true });
    } catch (error) {
      dispatch(stopLoading())
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
  (id,{name,price,description,tag, size, category, subCategory, weight}, images, navigate) => async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('description',description)
      formData.append('tag', tag)
      formData.append('size', size)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('weight', weight)
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
      Swal.fire({
        title:'Producto eliminado con éxito',
        icon:'success',
        confirmButtonColor:green[800],
        timer:3000,
        timerProgressBar:true
      });
      dispatch(deleteProduct(data.data))
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
