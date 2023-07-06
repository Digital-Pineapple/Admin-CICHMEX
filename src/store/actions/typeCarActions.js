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

export const getOneTypeCar = (typeCar_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/type-car/${typeCar_id}`);
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
    const { data } = await instanceApi.post(`/type-car/`, values);
    dispatch(onAddNewTypeCar(data.data));
    enqueueSnackbar('Tipo de auto creado con éxito', {variant:'success', anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }})

  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al agregar el tipo de auto : ${error.response.data?.message}`,
    {variant:'error', anchorOrigin: {
     vertical: 'top',
     horizontal: 'right'
   }})
  }
};

export const deleteOneTypeCar = (typeCar_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/type-car/${typeCar_id}`);
    dispatch(deleteTypeCar(typeCar_id));
    
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
            `/type-car/${typeCar_id}`,values
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
          `/type-car/${typeCar_id}`,name
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
