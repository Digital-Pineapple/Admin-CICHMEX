import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { loadTypeUsers } from "../reducer/typeUserReducer";

const headerConfig = {
  headers: {
      "Content-type": "application/json",
       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
};    


export const startLoadTypeUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/type-user", {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      dispatch(loadTypeUsers(data.data));
    } catch (error) {
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

export const startCreateTypeUser = (values, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post("/type-user",values, headerConfig);
      enqueueSnackbar(` ${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate('/auth/Tipos-Usuario',{replace:true})
    } catch (error) {
      console.log(error);
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

