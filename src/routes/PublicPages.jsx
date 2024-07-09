import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore"
import { useSelector } from "react-redux";

const PublicPages = ({children }) => {

    const { logged } = useAuthStore();
    return !logged ? children : <Navigate to={'/auth/Home'}/>
    
  };

  export default PublicPages;

  
