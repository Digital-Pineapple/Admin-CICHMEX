import { useEffect, useState } from "react";
import { useAuthStore } from "./hooks";
import LoadingScreenBlue from "./components/ui/LoadingScreenBlue";
import RoutesContainer from "./routes/RoutesContainer";
import { addNotification } from "./store/reducer/notificationsReducer";
import io from "socket.io-client";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";

const App = () => {
  const { RevalidateToken, logged, user } = useAuthStore();
  const [loader, setLoader] = useState(false);
  let token = localStorage.getItem('token') || null;
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  // Este efecto verifica si el usuario está autenticado y configura el socket para recibir notificaciones.
  // Si el usuario no está autenticado, se desconecta el socket.
  // useEffect(() => {
  //   if (logged) {
  //     const newSocket = io.connect(import.meta.env.VITE_SOCKET_URL);
  //     newSocket.emit("register", user?._id);
  //     setSocket(newSocket);

  //     const handleReceiveEvent = (data) => {
  //       // Muestra una notificación cuando se recibe un evento desde el servidor.
  //       enqueueSnackbar(`${data.message}`, {
  //         autoHideDuration: 2000,
  //         anchorOrigin: { horizontal: "right", vertical: "top" },
  //         variant: "default",
  //       });
  //       dispatch(addNotification(data));
  //     };

  //     newSocket.on("received_notification", handleReceiveEvent);

  //     return () => {
  //       newSocket.off("received_notification", handleReceiveEvent);
  //       newSocket.disconnect();
  //     };
  //   } else {
  //     if (socket) {
  //       socket.disconnect();
  //       setSocket(null);
  //     }
  //   }
  // }, [logged]);

  // Este efecto se ejecuta al cargar la aplicación y verifica si hay un token en el almacenamiento local.
  // Si existe un token, intenta revalidarlo para mantener la sesión activa.
  useEffect(() => {
    async function check() {
      setLoader(true); // Activa el estado de carga.
      if (!!token) {
        await RevalidateToken(); // Revalida el token si existe.
      }
      setLoader(false); // Desactiva el estado de carga.
    }
    check();
  }, [token]);

  // Si la aplicación está en estado de carga, muestra una pantalla de carga.
  if (loader) {
    return <LoadingScreenBlue />;
  }

  // Si no está cargando, renderiza el contenedor de rutas con la información del usuario.
  return <RoutesContainer logged={logged} user={user} />;
};

export default App;
