import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
    loadTypeCars,
    loadTypeCar,
    onAddNewTypeCar,
    deleteTypeCar,
    editTypeCar,
} from "../reducer/typeCarReducer";
import Cookies from "js-cookie";

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
    enqueueSnackbar('se elimino correctamente')
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
          const formData = new FormData();
          formData.append('name', values.name );
          formData.append('typeCar_image',values.typeCar_image);
        const { data } = await instanceApi.put(
            `/type-car/${typeCar_id}`,formData, {
              headers: {
                token: Cookies.get("session"),
                "Content-Type": "multipart/form-data",
              }
            }
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
