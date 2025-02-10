import { useDispatch, useSelector } from "react-redux";
import {
  startChangePassword,
  startLogin,
  startLogout,
  startRevalidateToken,
} from "../store";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";
import { useMemo } from "react";

export const useAuthStore = () => {
  const { user, logged, routes } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const StartLogin = async (email, password, captcha) => dispatch(startLogin(email, password,captcha, navigate));
  const RevalidateToken = async () => dispatch(startRevalidateToken(navigate));
  const LoadPublicRoutes = async ()=>  dispatch(startPublicLinks());
  const loadLogout = async () => dispatch(startLogout(navigate));
  const changePassword = ( values, handleClose) => dispatch(startChangePassword(values,handleClose))

   const componentLinks = (routes) => {
        const routeNotFound = AllRoutes.find((e) => e.id === 1);
        const elLink = routes.map((rdb) => {
          const matchedComponent = AllRoutes.find((i) => i.id === rdb.component);
          return {
            path: rdb.path,
            name: rdb.name,
            element: matchedComponent
              ? matchedComponent?.element
              : routeNotFound?.element,
          };
        });
        return elLink;
      };
  
  return {
    user,
    logged,
    routes,
    navigate,
    StartLogin,
    RevalidateToken,
    LoadPublicRoutes,
    loadLogout,
    componentLinks,
    loading,
    changePassword

  };
};
