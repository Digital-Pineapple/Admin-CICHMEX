import { useDispatch, useSelector } from "react-redux";
import {
  startLogin,
  startLogout,
  startRevalidateToken,
} from "../store";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";

export const useAuthStore = () => {
  const { user, logged, routes } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const StartLogin = async (email, password) => dispatch(startLogin(email, password, navigate));
  const RevalidateToken = async () => dispatch(startRevalidateToken());
  const LoadPublicRoutes = async ()=>  dispatch(startPublicLinks());
  const loadLogout = async () => dispatch(startLogout(navigate));

 
  
  return {
    user,
    logged,
    routes,
    navigate,
    token,
    StartLogin,
    RevalidateToken,
    LoadPublicRoutes,
    loadLogout,
  };
};
