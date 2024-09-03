import { useEffect, useState } from "react";
import { useAuthStore } from "./hooks";
import LoadingScreenBlue from "./components/ui/LoadingScreenBlue";
import RoutesContainer from "./routes/RoutesContainer";

const App = () => {
  const { RevalidateToken, token } = useAuthStore();
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
   async function check (){
      if(token)
       await RevalidateToken();
      setLoader(false)
      }
      check();
  }, [token])

  if (loader) {
    return <LoadingScreenBlue />;
  }
   return <RoutesContainer />;
};

export default App;
