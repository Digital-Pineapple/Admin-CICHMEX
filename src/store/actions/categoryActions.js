import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadCategories,
  loadCategory,
  deleteCategory,
  editCategory,
  onAddNewCategory,
} from "../reducer/categoryReducer";

export const startLoadCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/category");
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
    const { data } = await instanceApi.get(`/category/${category_id}`);
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
    const { data } = await instanceApi.post(`/category/`, values);
    dispatch(onAddNewCategory(data.data));
    enqueueSnackbar('Categoria creada con éxito', {variant:'success', anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }})

  } catch (error) {
    console.log(error);
    enqueueSnackbar(`Ocurrió un error al agregar la categoria : ${error.response.data?.message}`,
    {variant:'error', anchorOrigin: {
     vertical: 'top',
     horizontal: 'right'
   }})
  }
};

export const deleteOneCategory = (category_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/category/${category_id}`);
    dispatch(deleteCategory(category_id));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la categoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
  }
};

export const editOneCategory = (category_id, values) => {
    return async (dispatch) => {
        try {
        const { data } = await instanceApi.patch(
            `/category/${category_id}`,values
        );
        dispatch(editCategory(category_id, data.data));
        enqueueSnackbar('Categoria actualizada con exito', {variant:'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
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
