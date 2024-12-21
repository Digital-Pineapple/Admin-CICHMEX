import { useEffect, useState } from "react";
import { useAuthStore } from "./hooks";
import LoadingScreenBlue from "./components/ui/LoadingScreenBlue";
import RoutesContainer from "./routes/RoutesContainer";


const App = () => {
  const { RevalidateToken, logged, user } = useAuthStore();
  const [loader, setLoader] = useState(false);
  let token = localStorage.getItem('token') || null
  useEffect(() => {
   async function check (){
    setLoader(true)
      if(!!token)
       await RevalidateToken();
      setLoader(false)
      }
      check();
  }, [token])

  if (loader) {
    return <LoadingScreenBlue />;
  }
   return (<RoutesContainer logged={logged} user={user} />);
};

export default App;
