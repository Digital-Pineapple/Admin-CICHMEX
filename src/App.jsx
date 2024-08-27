import { useEffect, useState } from "react";

import RoutesContainer from "./routes/RoutesContainer";
import LoadingScreen from "./components/ui/LoadingScreen";
import { useAuthStore } from "./hooks";
// import { socket } from "./services/socket";

const App = () => {
  const { RevalidateToken, user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(async()=>{
      await RevalidateToken();
      setLoading(false)
    }, 500)
  }, []);
  // useEffect(() => {
  //   socket.on("connection", () => {
  //     console.log("Connected to socket server");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from socket server");
  //   });

  //   // Manejo de otros eventos
  //   socket.on("some_event", (data) => {
  //     console.log("Received data:", data);
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("some_event");
  //   };
  // }, []);
  return (
    <>
    {
      loading ? <LoadingScreen /> : <RoutesContainer/>
    }
    </>
  );
};

export default App;
