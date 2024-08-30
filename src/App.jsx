import { useEffect } from "react";
import { useAuthStore } from "./hooks";
import LoadingScreenBlue from "./components/ui/LoadingScreenBlue";
import RoutesContainer from "./routes/RoutesContainer";

const App = () => {
  const { RevalidateToken, token, loading } = useAuthStore();

  useEffect(() => {
      RevalidateToken();
  }, [])
  if (loading) {
    return <LoadingScreenBlue />;
  }

   return <RoutesContainer />;
};

export default App;
