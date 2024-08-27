import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onLoadLinks, onLogin, onLogout, startLoading, stopLoading } from "../store";
import { useNavigate } from "react-router-dom";
import { instanceApi } from "../apis/configAxios";
import Cookies from "js-cookie";
import userApi from "../apis/userApi";
import { headerConfig } from "../store/actions/headers";
import { AllRoutes } from "../routes/AllRoutes";

export const useAuthStore = () => {
  const { status, user, errorMessage, logged } = useSelector(
    (state) => state.auth
  );

  const { loading, links } = useSelector(
    (state) => state.ui
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
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get("/auth/user", {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      }); 
      
      const Links = await instanceApi.get('/dynamic-route/Links',{
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${data.data.token}`,
        },
        params:{
          system:'Admin'
        }
      })
      dispatch(onLoadLinks(Links.data.data))
      dispatch(onLogin(data.data.user));
    } catch (error) {
      
      dispatch(onLogout());
      setTimeout(() => {
        onLogout(
          error.response.data?.message || error.response.data.errors[0].message
        )
      }, 10);
    } finally{
      dispatch(stopLoading())
    }
  };


  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout());
  };

  const componentLink = links?.map((item, index) => {
    
    const matchedRoute = AllRoutes.filter((route) => route.component === item.component);
    
    return {
      ...item,
      component: matchedRoute?.component || null,  // Asegúrate de manejar el caso donde no se encuentre
    };
  });
  

  return {
    //* Propiedades
    errorMessage,
    status,
    user,
    RevalidateToken,
    logged,
    startLogout,
    StartLogin,
    navigate,
    loading,
    componentLink,
  };
};