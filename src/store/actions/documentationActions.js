import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  editDocumentation,
  loadDocumentation,
  loadDocumentations,
  onAddNewDocumentation,
} from "../reducer/documentationReducer";

const config = {
  headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
};    


export const startLoadDocumentations = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/documentation", config);
      dispatch(loadDocumentations(data.data));
    } catch (error) {
      enqueueSnackbar(
        `Ocurrió un error al cargar las documentaciones + ${error}`,
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

export const getOneDocumentation = (customer_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(
      `/documentation/user/${customer_id}`, config
    );
    dispatch(loadDocumentations(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la documentacion :  ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};
export const addOneDocumentation = (values) => async (dispatch) => {
  try {
    const { data } = await instanceApi.post(`/documentation/`, values, config);
    dispatch(onAddNewDocumentation(data.data));
    enqueueSnackbar("Documentacion creada con éxito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  } catch (error) {
    console.log(error);
    enqueueSnackbar(
      `Ocurrió un error al agregar la documentación : ${error.response.data?.message}`,
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

export const deleteOneDocumentation = (documentation_id) => async (
  dispatch
) => {
  try {
    await instanceApi.delete(`/documentation/${documentation_id}`, config);
    dispatch(deleteOneDocumentation(documentation_id));
  } catch (error) {
    enqueueSnackbar(
      `Ocurrió un error al eliminar la documentación + ${error}`,
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

export const editOneDocumentation = (documentation_id, values) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("message", values.message);
      formData.append("status", values.status);
      formData.append("url", values.url);
      formData.append("verify", values.verify);
      formData.append("customer_id", values.customer_id);

      const { data } = await instanceApi.put(
        `/documentation/${documentation_id}`,
        formData,
        config
      );
      dispatch(editDocumentation(documentation_id, data.data));
      enqueueSnackbar("Documentación actualizada con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar(
        `Ocurrió un error al actualizar la documentación + ${error}`,
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
export const searchDocumenation = ({ value }) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/documentation/${value ? `?search=${value}` : `?search=${""}`}`
      );
      console.log(data);
      dispatch(loadDocumentations(data.data));
      enqueueSnackbar("Documentacion encontradas con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al buscar la documentacion  ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

export const verifyOneDocument = (id,verify,message) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("verify", JSON.parse(verify));
      formData.append("message", message);

      const { data } = await instanceApi.put(
        `/documentation/verify`,
        formData,config
      );
      dispatch(editDocumentation(data.data));
      return data.data.verify
    } catch (error) {
      enqueueSnackbar(
        `Ocurrió un error al validar la documentación: ${error}`,
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
