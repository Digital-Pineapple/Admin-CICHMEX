import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadCategories,
  loadCategory,
  deleteCategory,
  editCategory,
  onAddNewCategory,
} from "../reducer/categoryReducer";
import { headerConfig } from "./headers";



export const startLoadCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/category",headerConfig);
      dispatch(loadCategories(data.data));
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar las categorias + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
    }
  };
};

export const getOneCategory = (category_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/category/${category_id}`, headerConfig);
    dispatch(loadCategory(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la categoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
  }
};
export const addOneCategory = (values) => async (dispatch) => {
  try {
    const { data } = await instanceApi.post(`/category/`, values, headerConfig);
    enqueueSnackbar('Categoria creada con éxito', {variant:'success', anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }})
    dispatch(loadCategory(data.data))
  } catch (error) {
    console.log(error);
    enqueueSnackbar(`Error : ${error.response.data?.message}`,
    {variant:'error', anchorOrigin: {
     vertical: 'top',
     horizontal: 'right'
   }})
  }
};

export const deleteOneCategory = (category_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/category/${category_id}`, headerConfig);
    dispatch(deleteCategory(category_id));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la categoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
  }
};

export const editOneCategory = (category_id, {name, category_image,}) => {

    return async (dispatch) => {
        try {
          const formData = new FormData();
          formData.append('name', name );
          formData.append('image',category_image);
        const { data } = await instanceApi.patch(
            `/category/${category_id}`,formData, {
              headers: {
                // token: localStorage.getItem('token'),
                // "Content-Type": "multipart/form-data",
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            }
        );
        enqueueSnackbar('Categoria actualizada con exito', {variant:'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
        dispatch(editCategory(category_id, data.data));
        } catch (error) {
          enqueueSnackbar(`Ocurrió un error al actualizar la categoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
        }
    };

};
export const searchCategories = ({value}) => {
  return async (dispatch) => {
      try {
      const { data } = await instanceApi.get(
          `/category/search/search${value ? `?search=${value}` : `?search=${""}`}`,
      );
      console.log(data);
      dispatch(loadCategories( data.data));
      enqueueSnackbar('Categorias encontradas con exito', {variant:'success', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }})
      } catch (error) {
        enqueueSnackbar(`Ocurrió un error al buscar la categoria + ${error}`,
         {variant:'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
      }
  };

};
