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
      enqueueSnackbar(`Ocurrió un error al cargar las sub-categorias + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
    }
  };
};

export const getOneSubCategory = (subCategory_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/sub-category/${subCategory_id}`);
    dispatch(loadSubCategory(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la sub-categoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
  }
};
export const addOneSubCategory = (values) => async (dispatch) => {
  try {
    const { data } = await instanceApi.post(`/sub-category/`, values);
    dispatch(onAddNewSubCategory(data.data));
    enqueueSnackbar('Subcategoria creada con éxito', {variant:'success', anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }})

  } catch (error) {
    console.log(error);
    enqueueSnackbar(`Ocurrió un error al agregar la subcategoria : ${error.response.data?.message}`,
    {variant:'error', anchorOrigin: {
     vertical: 'top',
     horizontal: 'right'
   }})
  }
};

export const deleteOneSubCategory = (subCategory_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/sub-category/${subCategory_id}`);
    dispatch(deleteSubCategory(subCategory_id));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la subcategoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
  }
};

export const editOneSubCategory = (subCategory_id, values) => {
    return async (dispatch) => {
        try {
          const formData = new FormData();
          formData.append('name', values.name );
          formData.append('description',values.description);
          formData.append('image',values.subCategory_image);
          formData.append('status', values.status);
        const { data } = await instanceApi.put(
            `/sub-category/${subCategory_id}`,formData, {
              headers: {
                token: Cookies.get("session"),
                "Content-Type": "multipart/form-data",
              }
            }
        );
        dispatch(editSubCategory(subCategory_id, data.data));
        enqueueSnackbar('Subategoria actualizada con exito', {variant:'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }})
        } catch (error) {
          enqueueSnackbar(`Ocurrió un error al actualizar la subcategoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
        }
    };

};
export const searchSubCategories = ({value}) => {
  return async (dispatch) => {
      try {
      const { data } = await instanceApi.get(
          `/sub-category/search/search${value ? `?search=${value}` : `?search=${""}`}`,
      );
      console.log(data);
      dispatch(loadSubCategories( data.data));
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
