import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
    loadTypeCars,
    loadTypeCar,
    onAddNewTypeCar,
    deleteTypeCar,
    editTypeCar,
} from "../reducer/typeCarReducer";

export const startLoadTypeCars = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/type-car");
      dispatch(loadTypeCars(data.data));
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar los tipo de autos + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
    }
  };
};

export const getOneTypeCar = (category_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/category/${typeCar_id}`);
    dispatch(loadTypeCar(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la categoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
  }
};
export const addOneTypeCar = (values) => async (dispatch) => {
  try {
    const { data } = await instanceApi.post(`/category/`, values);
    dispatch(onAddNewTypeCar(data.data));
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

export const deleteOneTypeCar = (typeCar_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/category/${typeCar_id}`);
    dispatch(deleteTypeCar(category_id));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la categoria + ${error}`,
           {variant:'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }})
  }
};

export const editOneTypeCar = (typeCar_id, values) => {
    return async (dispatch) => {
        try {
        const { data } = await instanceApi.patch(
            `/category/${category_id}`,values
        );
        dispatch(editTypeCar(typeCar_id, data.data));
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
export const searchCategory = (name) => {
  return async (dispatch) => {
      try {
      const { data } = await instanceApi.get(
          `/category/${typeCar_id}`,name
      );
      dispatch(editCategory(typeCar_id, data.data));
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
