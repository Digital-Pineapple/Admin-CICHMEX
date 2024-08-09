import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadCategories,
  loadCategory,
  deleteCategory,
} from "../reducer/categoryReducer";
import {
  headerConfig,
  headerConfigForm,
  headerConfigFormData,
} from "./headers";
import { startLoading, stopLoading } from "../reducer/uiReducer";

export const startLoadCategories = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get("/category", 
        {headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },}
      );
      dispatch(loadCategories(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar las categorias + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch(stopLoading())
    }
  };
};

export const getOneCategory = (category_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(
      `/category/${category_id}`,
      headerConfig
    );
    dispatch(loadCategory(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la categoria + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};
export const addOneCategory =
  ({ name, image }, navigate) =>
  async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      await instanceApi.post(`/category/`, formData, headerConfigForm);
      enqueueSnackbar("Categoria creada con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/auth/categorias", { replace: true });
    } catch (error) {
      enqueueSnackbar(`Error : ${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

export const deleteOneCategory = (category_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/category/${category_id}`, headerConfig);
    dispatch(deleteCategory(category_id));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la categoria + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

export const editOneCategory = (
  category_id,
  { name, category_image },
  navigate
) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", category_image);
      const { data } = await instanceApi.patch(
        `/category/${category_id}`,
        formData,
        headerConfigFormData
      );
     
      navigate(`/auth/Categorias`, {replace:true})
       enqueueSnackbar("Se editó con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar(
        `Ocurrió un error`,
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
export const searchCategories = ({ value }) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/category/search/search${value ? `?search=${value}` : `?search=${""}`}`
      );
      console.log(data);
      dispatch(loadCategories(data.data));
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
