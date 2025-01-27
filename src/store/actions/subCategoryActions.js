import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadSubCategories,
  loadSubCategory,
  deleteSubCategory,
  editSubCategory,
  onAddNewSubCategory,
  loadSubCategoriesByCategory,
} from "../reducer/subCategoryReducer";
import { headerConfigApplication } from "../../apis/headersConfig";
import {
  headerConfig,
  headerConfigForm,
  headerConfigFormData,
} from "./headers";
import { replace } from "formik";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import Swal from "sweetalert2";

export const startLoadSubCategories = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get("/sub-category");
      dispatch(loadSubCategories(data.data), {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(
        `Ocurrió un error al cargar las sub-categorias + ${error}`,
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
      dispatch(stopLoading())
    }
  };
};

export const getOneSubCategory = (subCategory_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(
      `/sub-category/${subCategory_id}`,
      {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      }
    );
    dispatch(loadSubCategory(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la sub-categoria + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};
export const getOneDetailSubCategory = (id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(
      `/sub-category/detail/${id}`,
      {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      }
    );
    dispatch(loadSubCategory(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la sub-categoria + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};
export const addOneSubCategory = ({name, category_id, subCategory_image}, handleClose) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category_id", category_id);
      formData.append("subCategory_image", subCategory_image);
      const { data } = await instanceApi.post(
        `/sub-category`,
        formData,
        {
          headers: {
            "Content-type": "/multipart/form-data",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(onAddNewSubCategory(data.data))
       Swal.fire(`${data.message}`, '', 'success')
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }finally{
     handleClose(),
     dispatch( stopLoading())
    }
  };
};
export const deleteOneSubCategory = (id, navigate) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const { data } = await instanceApi.delete(
      `/sub-category/${id}`,
      {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      }
    );
    enqueueSnackbar(`${data.message}`, {
      variant: "success",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
    dispatch(deleteSubCategory(id));
    dispatch(stopLoading())
  } catch (error) {
    enqueueSnackbar(
      `${error.response.data.message}`,
      {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      }
    );
    dispatch(stopLoading())
  }
};

export const editOneSubCategory = (
  subCategory_id,
  { name, subCategory_image, category_id }, handleClose
) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("subCategory_image", subCategory_image);
      formData.append("category_id", category_id);
      const { data } = await instanceApi.patch(
        `/sub-category/${subCategory_id}`,
        formData,
        {
          headers: {
            "Content-type": "/multipart/form-data",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      console.log(data.data);
      
      
      dispatch(editSubCategory(data.data))
    Swal.fire(`${data.message}`, '', 'success')
    } catch (error) {
      console.log(error);
      
     
    }finally{
      handleClose()
      dispatch(stopLoading())

    }
  };
};
export const searchSubCategories = ({ value }) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/sub-category/search/search${
          value ? `?search=${value}` : `?search=${""}`
        }`
      );
      // console.log(data);
      dispatch(loadSubCategories(data.data));
      enqueueSnackbar("Categorias encontradas con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al buscar la categoria + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
export const getSubCategoriesByCategory = (id) => {
  
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/sub-category/subCategory/${id}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadSubCategoriesByCategory(data.data))
    } catch (error) {
      console.error(error);
    }
  };
};
