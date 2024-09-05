import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  deleteProduct,
  editProduct,
  loadProduct,
  loadProductEntries,
  loadProductOutputs,
  loadProducts,
  onEditVideoProduct,
  onAddNewProduct,
  onEditThumbnailProduct,
} from "../reducer/productsReducer";
import {
  headerConfigApplication,
  headerConfigFormData,
} from "../../apis/headersConfig";
import Swal from "sweetalert2";
import { headerConfig } from "./headers";
import { green } from "@mui/material/colors";
import { startLoading, stopLoading } from "../reducer/uiReducer";

export const startLoadProducts = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadProducts(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}|| 'Error al consultar información'`,
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
    dispatch(stopLoading());
  };
};
export const startLoadStockProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/stock-StoreHouse/available/ok`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const info = data.data.map((item, index) => {
        const info = item.product_id;
        const stock = item.stock;
        const stock_id = item._id;
        const totInfo = { ...info, stock, stock_id };
        return totInfo;
      });
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

export const startLoadNonExistProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/product/non-existent/get`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },  
        }
      );
      dispatch(loadProducts(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}` || "Error al consultar la información",
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
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadProductEntries(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}` || "Error al consultar la información",
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
  };
};
export const startLoadAllInputs = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/stock-StoreHouse/all-inputs`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(loadProductEntries(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}` || "Error al consultar la información",
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
  };
};
export const startLoadAllOutputs = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/stock-StoreHouse/all-outputs`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(loadProductOutputs(data.data));
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}` || "Error al consultar la información",
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
  };
};

export const startLoadOutputsProduct = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/stock-StoreHouse/all-outputs`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadProductOutputs(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message}` || "Error al consultar la información",
        {
          anchorOrigin: { horizontal: "center", vertical: "top" },
          variant: "error",
        }
      );
    }
    dispatch(stopLoading);
  };
};

export const LoadOneProduct = (_id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/product/${_id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
    finally{
      dispatch(stopLoading())
    }
  };
};

export const addOneProduct =
  (
    {
      name,
      price,
      description,
      tag,
      dimensions,
      category,
      subCategory,
      weight,
      videos,
      brand,
      discountPrice,
      porcentDiscount,
      product_key,
      seoDescription,
      shortDescription,
      thumbnail,
      seoKeywords,
    },
    images,
    navigate
  ) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("tag", tag);
      formData.append("dimensions", dimensions);
      formData.append("subCategory", subCategory);
      formData.append("category", category);
      formData.append("weight", weight);
      formData.append("brand", brand);
      formData.append("discountPrice", discountPrice);
      formData.append("porcentDiscount", porcentDiscount);
      formData.append("product_key", product_key);
      formData.append("seoDescription", seoDescription);
      formData.append("shortDescription", shortDescription);
      formData.append("thumbnail", thumbnail);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      for (let i = 0; i < seoKeywords.length; i++) {
        formData.append("seoKeywords", seoKeywords[i]);
      }
      for (let i = 0; i < videos.length; i++) {
        formData.append("videos", videos[i]);
      }

      const { data } = await instanceApi.post(
        `/product/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(onAddNewProduct(data.data));
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/mi-almacen/productos", { replace: true });
    } catch (error) {
      
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      
    }
    finally{
      dispatch(stopLoading());
    }
  };

export const editOneProduct =
  (
    id,
    values,
    images,
    navigate
  ) =>
  async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/updateInfo/${id}`,
        {values},
        {
          headers: {
            "Content-Type": 'multipart/form-data',
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(editProduct(data.data));
      enqueueSnackbar("Editado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      // navigate("/m/productos", { replace: true });
    } catch (error) {

      enqueueSnackbar(`Ocurrió un error + ${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  export const updateProductVideos = (id, values)=>{  
    const video2 = []
    video2.push(values)
    return async (dispatch) => {
      dispatch(startLoading())
      try {
        const formData = new FormData();
        for (let i = 0; i <video2.length; i++) {
          formData.append("videos", video2[i]);
        }
        const { data } = await instanceApi.put(
          `/product/updateVideo/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(onEditVideoProduct(data.data.videos));
        enqueueSnackbar(`${data.message}`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      } catch (error) {
        console.log(error);
        
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

    }
  }

  export const startUpdateThumbnail = (id, values)=>{    
    return async (dispatch) => {
      dispatch(startLoading())
      try {
        const formData = new FormData();
        formData.append("thumbnail", values);
        const { data } = await instanceApi.put(
          `/product/updateThumbnail/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(onEditThumbnailProduct(data.data.thumbnail));
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

    }
  }

  export const startUpdateImages = (id, values)=>{    
    return async (dispatch) => {
      dispatch(startLoading())
      const formData = new FormData
      values.map((item) => {
        if (item.file) {
          formData.append(`images[${item.id}]`, item.file);
        }
      });      
      try {
        const { data } = await instanceApi.post(
          `/product/updateImages/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(onEditThumbnailProduct(data.data.images));
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

    }
  }

export const deleteOneProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(
        `/product/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(deleteProduct(data.data?._id));
      Swal.fire({
        title: "Producto eliminado con éxito",
        icon: "success",
        confirmButtonColor: green[800],
        timer: 3000,
        timerProgressBar: true,
      });
      dispatch(deleteProduct(data.data));
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

export const startAddMultipleEntries = (values, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/stock-StoreHouse/add/multiple-entries`,
        values,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: `${data.message}`,
        text: `Folio de entradas: ${data.data}`,
        icon: "success",
        confirmButtonColor: green[800],
      });
      navigate("/auth/MiAlmacen/entradas", { replace: true });
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
export const startAddMultipleOutputs = (values, navigate) => {
  console.log(values);

  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/stock-StoreHouse/add/multiple-outputs`,
        values,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: `${data.message}`,
        text: `Folio de salida: ${data.data}`,
        icon: "success",
        confirmButtonColor: green[800],
      });
      navigate("/auth/MiAlmacen/salidas", { replace: true });
    } catch (error) {
      console.log(error);

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
