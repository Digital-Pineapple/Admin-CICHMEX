import { useEffect } from "react";
import { useAuthStore } from "./hooks";
import {PrivateRoutes} from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";


const App = () => {
  const { RevalidateToken, logged, token } = useAuthStore();
  useEffect(() => {
    if (!!token) {
      RevalidateToken();
    }
  }, []);

  
  if (logged) {
    return(
      <PrivateRoutes/>
    )
  }else{
    return (
      <PublicRoutes/>
    )
  }
  

};

export default App;
