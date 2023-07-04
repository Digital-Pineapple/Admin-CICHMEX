import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadCategories,
  loadCategory,
  deleteCategory,
  editCategory,
} from "../reducer/categoryReducer";

export const startLoadCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/category");
      dispatch(loadCategories(data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOneCategory = (category_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/category/${category_id}`);
    dispatch(loadCategory(data.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneCategory = (category_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/category/${category_id}`);
    dispatch(deleteCategory(category_id));
  } catch (error) {
    console.log(error);
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
