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

  const PrivateLinks = () => {
    const elLink = []
    const routeNotFound = AllRoutes.find((r) => r.id === 0);
      links.map( (rdb) => {
        const matchedComponent = AllRoutes.find(
          (i) => i.id === rdb.component 
        );
        const elem = {
          path:rdb.path,
          name:rdb.name,
          element: matchedComponent
            ? matchedComponent.element
            : routeNotFound.element,
        };
        elLink.push(elem)
      })
      return elLink;
  };



  

  const PublicLinks = () => {
    const elLink = []
    const routeNotFound = AllRoutes.find((r) => r.id === 0);
      links.map( (rdb) => {
        const matchedComponent = AllRoutes.find(
          (i) => i.id === rdb.component  
        );
        const elem = {
          path:rdb.path,
          name:rdb.name,
          element: matchedComponent
            ? matchedComponent.element
            : routeNotFound.element,
        };
        elLink.push(elem)
      })
      return elLink;
  };
  
  return {
    StartLogin,
    RevalidateToken,
    loading,
    user,
    logged,
    navigate,
    loadLogout,
    PrivateLinks,
    links,
    LoadPublicRoutes,
    PublicLinks,
    token,
  };
};
