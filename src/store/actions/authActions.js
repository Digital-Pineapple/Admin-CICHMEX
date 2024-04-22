import axios from "axios";
import Cookies from "js-cookie";
import { instanceApi } from "../../apis/configAxios";
import { enqueueSnackbar } from "notistack";
import { onLogin } from '../reducer/authReducer'


export const startLogin = ({ email, password }) => async (dispatch) => {
 
  try {
    const { data } = await instanceApi.post("/auth/login", {
      email,
      password,
    },{
      headers: {
        "Content-type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    });
    dispatch(onLogin(data.data.user));
    localStorage.setItem("token", data.data.token, { expires: 7 });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      enqueueSnackbar(
        "Error en el inicio de sesión" && error.response.data.message,
        { variant: "error" }
      );
      return {
        success: false,
      };
    }
    return {
      success: false,
    };
  }
};

export const startRevalidateToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await userApi.get("/auth/user", {
      headers: {
        Token: token,
      },
    });
    dispatch(onLogin(data.data.user))
  } catch (error) {
    console.log(error);
  }
};
