import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadSubCategories,
  loadSubCategory,
  deleteSubCategory,
  editSubCategory,
  onAddNewSubCategory,
} from "../reducer/subCategoryReducer";
import Cookies from "js-cookie";

export const startLoadSubCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/sub-category");
      dispatch(loadSubCategories(data.data));
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
    const { data } = await instanceApi.get(`/sub-category/${subCategory_id}`);
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
export const addOneSubCategory = (values) => {

  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category_id", values.category);
      const { data } = await instanceApi.post(
        `/sub-category`,values
      );

      dispatch(addOneSubCategory(data,data));
      enqueueSnackbar("Alta exitosa", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return data
    } catch (error) {
      
      enqueueSnackbar(
        `Error:  ${error.response.data?.message}`,
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
}
export const deleteOneSubCategory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token')
   const {data} =  await instanceApi.delete(`/sub-category/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
    enqueueSnackbar("Se eliminó con éxito", {
      variant: "success",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
    dispatch(deleteSubCategory(id));
    return data
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la subcategoria + ${error.response.data.message}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

export const editOneSubCategory = (subCategory_id, values) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.subCategory_image);
      formData.append("category", values.category);
      const token = localStorage.getItem('token')
      console.log(token);
      const { data } = await instanceApi.post(
        `/sub-category/${subCategory_id}`,
        formData,
        {
          headers: {
  
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(editSubCategory(subCategory_id, data.data));
      enqueueSnackbar("Editado con éxito con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return data
    } catch (error) {
      enqueueSnackbar(
        `Error:  ${error.data.response?.message}`,
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
export const searchSubCategories = ({ value }) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/sub-category/search/search${
          value ? `?search=${value}` : `?search=${""}`
        }`
      );
      console.log(data);
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
