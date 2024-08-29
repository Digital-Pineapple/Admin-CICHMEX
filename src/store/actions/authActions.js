import { replace } from "formik";
import { instanceApi } from "../../apis/configAxios";
import { onLogin, onLogout } from "../reducer/authReducer";
import { setLinks, startLoading, stopLoading } from "../reducer/uiReducer";

export const startLogin = ( email, password, navigate ) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post("/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", data.data.token);
      const Links = await instanceApi.get("/dynamic-route/Links", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${data.data.token}`,
        },
        params: {
          system: "Admin",
        },
      });
      dispatch(setLinks(Links.data.data))
      dispatch(onLogin(data.data.user));
      navigate('/principal',  { replace: true });
    } catch (error) {
      dispatch(
        onLogout(
          error.response.data?.message || error.response.data.errors[0].message
        )
      );
    }
  };
};

export const startRevalidateToken = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get("/auth/user", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const Links = await instanceApi.get("/dynamic-route/Links", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${data.data.token}`,
        },
        params: {
          system: "Admin",
        },
      });
      dispatch(setLinks(Links.data.data))
      dispatch(onLogin(data.data.user))
    } catch (error) {
      dispatch(onLogout());
      onLogout(
        error.response.data?.message || error.response.data.errors[0].message
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};
export const startPublicLinks = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const Links = await instanceApi.get("/dynamic-route/public-links", {
        params: {
          system: "Admin",
        },
      });
      dispatch(setLinks(Links.data.data))
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };
};

 export const startLogout = (navigate) => {
  return async (dispatch)=>{
    dispatch(startLoading());
    try {
      dispatch(onLogout());
      localStorage.clear();
      navigate('/login',{replace:true})
    } catch (error) {
      console.log(error); 
    }finally{
      dispatch(stopLoading());
    }
  }
}
