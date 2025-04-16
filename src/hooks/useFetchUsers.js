import { useEffect, useState } from "react";
import { getUsers } from '../helpers'

// Hook personalizado para obtener usuarios basado en un `uid`
export const useFetchUsers = (uid) => {
  
  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState([]);
  // Estado para manejar el estado de carga
  const [isLoading, setIsLoading] = useState(true);

  // Función asíncrona para obtener los datos del usuario
  const getUser = async () => {
    // Llama a la función `getUsers` con el `uid` y almacena el resultado
    const newUser = await getUsers(uid);
    // Actualiza el estado con los datos obtenidos
    setUser(newUser);
    // Cambia el estado de carga a `false` una vez que los datos han sido cargados
    setIsLoading(false);
  };
  
  // Efecto secundario que se ejecuta al montar el componente
  useEffect(() => {
    getUser(); // Llama a la función para obtener los datos del usuario
  }, []); // Dependencias vacías para que se ejecute solo una vez

  // Retorna el estado del usuario y el estado de carga
  return {
    user,      // Datos del usuario
    isLoading  // Indicador de si los datos están cargando
  }
}
