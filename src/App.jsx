import { useEffect, useState } from "react";
import { useAuthStore } from "./hooks";
import LoadingScreenBlue from "./components/ui/LoadingScreenBlue";
import RoutesContainer from "./routes/RoutesContainer";
import { addNotification } from "./store/reducer/notificationsReducer";
import  io  from "socket.io-client";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";


const App = () => {
  const { RevalidateToken, logged, user } = useAuthStore();
  const [loader, setLoader] = useState(false);
  let token = localStorage.getItem('token') || null
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (logged) {
      const newSocket = io.connect(import.meta.env.VITE_SOCKET_URL);
      newSocket.emit("register", user?._id);
      setSocket(newSocket);

      const handleReceiveEvent = (data) => {
        // console.log(data, "xd");
        enqueueSnackbar(`${data.message}`, {
          autoHideDuration: 2000,
          anchorOrigin: { horizontal: "right", vertical: "top" },
          variant: "default",
        });
        dispatch(addNotification(data));
      };

      newSocket.on("received_notification", handleReceiveEvent);

      return () => {
        newSocket.off("received_notification", handleReceiveEvent);
        newSocket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [logged]);

  
 

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
