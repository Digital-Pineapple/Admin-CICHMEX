import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onLogin, onLogout } from "../store";
import { useNavigate } from "react-router-dom";
import { instanceApi } from "../apis/configAxios";
import Cookies from "js-cookie";
import userApi from "../apis/userApi";

export const useAuthStore = () => {
  const { status, user, errorMessage, logged} = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const StartLogin = async({email, password}) =>{
      try {
          const { data } = await instanceApi.post('/auth/admin/login', {email: email, password:password})
          dispatch(onLogin(data.data.user));
          Cookies.set('session', data.data.token, { expires : 7 });
          navigate("/Principal", { replace: true });
      } catch (error) {
        console.log(error);
        dispatch(
          onLogout(
            error.response.data?.message || error.response.data.errors[0].message
          )
        );
        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 10);
      }
  }
  


  const RevalidateToken = async () => {
    try {
<<<<<<< HEAD
      const token1 = localStorage.getItem('TokenAdmin');
      const { data } = await userApi.get("/auth/user", {
        headers: {
          token: token1,
        },
      });
      dispatch (onLogin(data.data))
=======
      const token = localStorage.getItem("token");
      const { data } = await instanceApi.get("/auth/user", {
        headers: {
          Token: token,
        },
      });
>>>>>>> 51f92ccf0726bf9bcec9bee579e196ab2d6180c5
      
      dispatch(onLogin(data.data.user))
    } catch (error) {
      console.log(error);
      dispatch(onLogout());
      setTimeout(() => {
        onLogout(
          error.response.data?.message || error.response.data.errors[0].message
        )
      }, 10);
    }
  };


  const startLogout = () => {
<<<<<<< HEAD
    localStorage.removeItem("TokenAdmin");
=======
    localStorage.clear()
>>>>>>> 51f92ccf0726bf9bcec9bee579e196ab2d6180c5
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,
    RevalidateToken,
    logged,
    startLogout,
    StartLogin
  };
};