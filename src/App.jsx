import { useEffect, useState } from "react";
import { useAuthStore } from "./hooks";
import LoadingScreenBlue from "./components/ui/LoadingScreenBlue";
import RoutesContainer from "./routes/RoutesContainer";

const App = () => {
  const { RevalidateToken, token, loading } = useAuthStore();
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    function check (){
      if(token)
        RevalidateToken();
      }
      check();
  }, [token])

  if (loading) {
    return <LoadingScreenBlue />;
  }
   return <RoutesContainer />;
};

export default App;
