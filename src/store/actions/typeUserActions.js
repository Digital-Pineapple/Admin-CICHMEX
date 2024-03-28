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
      const { data } = await instanceApi.get("/type-user", headerConfig);
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

