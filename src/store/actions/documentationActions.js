import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  editDocumentation,
  loadDocumentation,
  loadDocumentations,
  onAddNewDocumentation,
} from "../reducer/documentationReducer";
import Cookies from "js-cookie";

export const startLoadDocumentations = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/documentation");
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
      `/documentation/customer/${customer_id}`
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
    const { data } = await instanceApi.post(`/documentation/`, values);
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
    await instanceApi.delete(`/documentation/${documentation_id}`);
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
        {
          headers: {
            token: Cookies.get("session"),
            "Content-Type": "multipart/form-data",
          },
        }
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

export const verifyOneDocument = (_id,verify,message) => {
  
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("_id", _id);
      formData.append("verify", verify);
      formData.append("message", message);

      const { data } = await instanceApi.post(
        `/documentation/validate`,
        formData,
        {
          headers: {
            token: Cookies.get("session"),
            "Content-Type": "appllication/x-www-form-urlencoded",
          },
        }
      );
      dispatch(editDocumentation(_id, data.data));
    } catch (error) {
      enqueueSnackbar(
        `Ocurrió un error al actualizar la documentación: ${error}`,
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
