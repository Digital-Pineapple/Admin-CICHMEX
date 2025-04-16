import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { loadTypeUsers } from "../reducer/typeUserReducer";

const headerConfig = {
  headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
};    

// Función para cargar los tipos de usuarios desde la API
export const startLoadTypeUsers = () => {
  return async (dispatch) => {
    try {
      // Realiza una solicitud GET para obtener los tipos de usuarios
      const { data } = await instanceApi.get("/type-user", {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      // Despacha la acción para cargar los datos en el estado
      dispatch(loadTypeUsers(data.data));
    } catch (error) {
      // Muestra un mensaje de error si la solicitud falla
      enqueueSnackbar(`Error + ${error.data.response?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

// Función para crear un nuevo tipo de usuario
export const startCreateTypeUser = (values, navigate) => {
  return async (dispatch) => {
    try {
      // Realiza una solicitud POST para crear un nuevo tipo de usuario
      const { data } = await instanceApi.post("/type-user", values, headerConfig);
      // Muestra un mensaje de éxito si la creación es exitosa
      enqueueSnackbar(` ${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      // Redirige al usuario a la página de tipos de usuario
      navigate('/auth/Tipos-Usuario', { replace: true });
    } catch (error) {
      console.log(error);
      // Muestra un mensaje de error si la creación falla
      enqueueSnackbar(`${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
