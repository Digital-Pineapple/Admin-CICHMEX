import { useDispatch, useSelector } from "react-redux";
import {
  startLogin,
  startLogout,
  startPublicLinks,
  startRevalidateToken,
} from "../store";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";

export const useAuthStore = () => {
  const { user, logged } = useSelector((state) => state.auth);
  const { loading, links } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const StartLogin = async (email, password) =>
    
    dispatch(startLogin(email, password, navigate));

  const RevalidateToken = async () => dispatch(startRevalidateToken());
  const LoadPublicRoutes = async ()=>  dispatch(startPublicLinks());
  const loadLogout = async () => dispatch(startLogout(navigate));

 
  
  return {
    StartLogin,
    RevalidateToken,
    loading,
    user,
    logged,
    navigate,
    loadLogout,
    links,
    LoadPublicRoutes,
    token,
    dispatch
  };
};
