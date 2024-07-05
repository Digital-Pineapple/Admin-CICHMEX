import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadSubCategories,
  loadSubCategory,
  deleteSubCategory,
  editSubCategory,
  onAddNewSubCategory,
} from "../reducer/subCategoryReducer";
import { headerConfigApplication } from "../../apis/headersConfig";
import {
  headerConfig,
  headerConfigForm,
  headerConfigFormData,
} from "./headers";
import { replace } from "formik";

export const startLoadSubCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/sub-category");
      dispatch(loadSubCategories(data.data), headerConfig);
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
    }
  };
};

export const getOneSubCategory = (subCategory_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(
      `/sub-category/${subCategory_id}`,
      headerConfig
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
export const addOneSubCategory = ({name, category_id, subCategory_image}, navigate) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category_id", category_id);
      formData.append("subCategory_image", subCategory_image);
      const { data } = await instanceApi.post(
        `/sub-category`,
        formData,
        headerConfigForm
      );
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate('/auth/SubCategorias', {replace:true})
    } catch (error) {
      enqueueSnackbar(`Error al dar de alta`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
export const deleteOneSubCategory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await instanceApi.delete(
      `/sub-category/${id}`,
      headerConfig
    );
    enqueueSnackbar("Se eliminó con éxito", {
      variant: "success",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
    dispatch(deleteSubCategory(id));
    return data;
  } catch (error) {
    enqueueSnackbar(
      `Ocurrió un error al eliminar la subcategoria + ${error.response.data.message}`,
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

export const editOneSubCategory = (
  subCategory_id,
  { name, subCategory_image, category_id }, navigate
) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("subCategory_image", subCategory_image);
      formData.append("category", category_id);
      const { data } = await instanceApi.post(
        `/sub-category/${subCategory_id}`,
        formData,
        headerConfigFormData
      );
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate('/auth/SubCategorias',{replace:true})
    } catch (error) {
      enqueueSnackbar(`Error al editar`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
export const getSubCategoriesByCategory = (value) => {
  // console.log(value,"");
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/sub-category/subCategory/${value}`,
        headerConfig
      );
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };
};
