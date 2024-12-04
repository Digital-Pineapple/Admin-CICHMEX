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
  onEditImagesProduct,
  onEditVideosProduct,
  startLoadingUpdate,
  stopLoadingUpdate,
  onStepNewProduct,
  onClearValues,
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
      const { data } = await instanceApi.get(`/product/non-existent/get`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    } finally {
      dispatch(stopLoading());
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
      // images,
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

      videos.forEach((video, index) => {
        formData.append(`videos[${index}][file]`, video.file);
        formData.append(`videos[${index}][type]`, video.type);
      });

      const { data } = await instanceApi.post(`/product/addProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar("Agregado con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/mi-almacen/productos", { replace: true });
    } catch (error) {
      enqueueSnackbar(
        `${error.response.data.message || error.response.data.error}`,
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    } finally {
      dispatch(stopLoading());
    }
  };

export const editOneProduct =
  (id, values, images, navigate) => async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/updateInfo/${id}`,
        { values },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export const updateProductVideos = (id, values) => {
  const video2 = [];
  video2.push(values);
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const formData = new FormData();
      for (let i = 0; i < video2.length; i++) {
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
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startUpdateThumbnail = (id, values) => {
  return async (dispatch) => {
    dispatch(startLoading());
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
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startAddOneImage = (id, file) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append(`image`, file);
    try {
      const { data } = await instanceApi.post(
        `/product/addImageDetail/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(onEditImagesProduct(data.data.images));
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
    }
  };
};

export const startAddOneVideo = (id, type, file) => {
  return async (dispatch) => {
    dispatch(startLoadingUpdate());
    const formData = new FormData();
    formData.append(`videos`, file);
    formData.append(`type`, type);
    try {
      const { data } = await instanceApi.post(
        `/product/video/addVideo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(loadProduct(data.data));
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
    } finally {
      dispatch(stopLoadingUpdate());
    }
  };
};

export const startDeleteOneImage = (id, image_id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/deleteImageDetail/${id}`,
        { imageId: image_id },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(onEditImagesProduct(data.data.images));
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
    }
  };
};
export const startDeleteOneVideo = (id, video_id) => {
  return async (dispatch) => {
    dispatch(startLoadingUpdate());
    try {
      const { data } = await instanceApi.post(
        `/product/deleteVideoDetail/${id}`,
        { video_id: video_id },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(loadProduct(data.data));
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
    } finally {
      dispatch(stopLoadingUpdate());
    }
  };
};

export const deleteOneProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.delete(`/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      navigate("/mi-almacen/productos/entradas", { replace: true });
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
      navigate("/mi-almacen/productos/salidas", { replace: true });
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

async function blobUrlToFile(blobUrl, filename) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

async function buildFormDataWithFiles(data) {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] === null || data[key] === undefined) continue;

    if (Array.isArray(data[key])) {
      for (const [index, item] of data[key].entries()) {
        if (key === "variants") {
          // Procesar variantes
          const variantKey = `${key}[${index}]`;
          for (const [subKey, subValue] of Object.entries(item)) {
            if (subKey === "images") {
              for (const [imgIndex, img] of subValue.entries()) {
                if (!!img.filePreview) {
                  const file = await blobUrlToFile(
                    img.filePreview,
                    `imagen-${index}-${imgIndex}.jpeg`
                  );
                  formData.append(`${variantKey}[${subKey}][${imgIndex}]`, file);
                }
              }
            } else if (subKey === "attributes") {
              for (const [attrKey, attrValue] of Object.entries(subValue)) {
                formData.append(
                  `${variantKey}[${subKey}][${attrKey}]`,
                  attrValue
                );
              }
            } else {
              formData.append(`${variantKey}[${subKey}]`, subValue);
            }
          }
        } else if (key === "videos") {
          // Procesar videos
          const videoKey = `${key}[${index}]`;
          const file = await blobUrlToFile(item.file, `video-${index}.mp4`);
          formData.append(`${videoKey}[file]`, file);
          formData.append(`${videoKey}[type]`, item.type);
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      }
    } else {
      formData.append(key, data[key]);
    }
  }

  return formData;
}
export const startAddProductWithVariants = (values, handleNext) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/createProductWithVariants/ok`,
        values,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(onStepNewProduct(data.data));
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      handleNext();
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
export const updateConditionStep = (id, values, handleNext) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/conditionProduct/${id}`,
        { condition: values },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(onStepNewProduct(data.data));
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      handleNext();
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

export const selectSizeGuide = (id, values, handleNext) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/selectSizeGuide/${id}`,
        { sizeGuide: values },
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
          horizontal: "right",
        },
      });
      if (!!handleNext) {
        dispatch(onStepNewProduct(data.data));
        handleNext();
      }
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

export const sizeGuideEdit = (id, values) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/selectSizeGuide/${id}`,
        { sizeGuide: values },
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
          horizontal: "right",
        },
      });
      if (!!handleNext) {
        dispatch(onStepNewProduct(data.data));
        handleNext();
      }
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

export const startAddConditionVariant = (values, handleNext) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/product/createProductWithVariants/ok`,
        values,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(onStepNewProduct(data.data));
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      handleNext();
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

export const startAddVariantsProduct = (id, values, handleNext) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      // Construcción del FormData
      const variants = await buildFormDataWithFiles(values);
      // Petición al backend
      const { data } = await instanceApi.post(
        `/product/addVariants/${id}`,
        variants,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Actualización del estado en Redux
      dispatch(onStepNewProduct(data.data));

      // Notificación de éxito
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      // Avanzar al siguiente paso
      handleNext();
    } catch (error) {
      // Manejo de errores con notificación
      enqueueSnackbar(
        error.response?.data?.message || "Error al enviar las variantes",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const startUpdateVariants = (id, values) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      // Construcción del FormData
      const variants = await buildFormDataWithFiles(values);
      // Petición al backend
      console.log(variants);
      
      const { data } = await instanceApi.post(
        `/product/updateVariants/${id}`,
        variants,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Actualización del estado en Redux
      dispatch(onStepNewProduct(data.data));

      // Notificación de éxito
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      // Avanzar al siguiente paso
      handleNext();
    } catch (error) {
      // Manejo de errores con notificación
      enqueueSnackbar(
        error.response?.data?.message || "Error al enviar las variantes",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const finishCreateProduct = (id, values, navigate, handleReset) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const formData = new FormData();

      // Añadir texto al FormData
      formData.append("description", values?.description);
      formData.append("shortDescription", values?.shortDescription);
      values?.keywords.forEach((keyword, index) => {
        formData.append(`seoKeywords`, keyword);
      });
      values?.videos.forEach((video, index) => {
        formData.append(`videos/${video.type}`, video.file);
      });

      const { data } = await instanceApi.post(
        `/product/addDescriptionAndVideos/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: `${data.message}`,
        text: `¿Quiere agregar otro producto?`,
        showCancelButton: true,
        confirmButtonText: "Si quiero agregar otro producto",
        cancelButtonText: `No quiero agregar otro producto`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleReset();
        } else if (result.isDismissed) {
          navigate("/mi-almacen/productos", { replace: true });
        }
      });
      dispatch(onClearValues());
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Error al enviar las variantes",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const StartUpdateMainFeatures = (id, values) => {
  console.log(values);

  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.post(
        `/product/updateMainFeatures/${id}`,
        { values: values },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(loadProduct(data.data));
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      dispatch(stopLoading());
    }
  };
  
};

export const startDelete = (id) => {

  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.delete(
        `/variant-product/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
      });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      dispatch(stopLoading());
    }
  };
  
};
