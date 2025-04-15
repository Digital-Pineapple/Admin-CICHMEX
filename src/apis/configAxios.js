import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import Swal from 'sweetalert2';

// Crear una instancia de Axios con una configuración base
export const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL base de la API obtenida de las variables de entorno
});

// Configurar encabezados comunes para todas las solicitudes
instanceApi.defaults.headers.common["Content-Type"] = "application/json"; 

// Interceptor de solicitudes para agregar el token de autorización
instanceApi.interceptors.request.use(
  async (config) => {        
      const token = await localStorage.getItem("token"); // Obtener el token del almacenamiento local
      if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado de autorización
      }
      return config; // Retornar la configuración modificada
  },
  (error) => {       
      return Promise.reject(error); // Manejar errores en la configuración de la solicitud
  }    
);

// Interceptor de respuestas para manejar errores y respuestas específicas
instanceApi.interceptors.response.use(
  response => response, // Retornar la respuesta si no hay errores
  error => {
    if (error.response) {
      const { status, data } = error.response;

      // Manejar el caso en que el token ha expirado
      if (status === 498 && data.message === 'El token ha expirado') {
        Swal.fire({
          title: 'Tu sesión ha expirado',
          text: 'Por favor, inicia sesión nuevamente.',
          confirmButtonColor: 'red',
          icon: 'info',
          iconColor: 'red',
          willClose: () => window.location.href = '/login' // Redirigir al login al cerrar el modal
        });
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
      }

      // Manejar el caso de token inválido o no autorizado
      if (status === 401 && data.message === 'Token inválido o no autorizado') {
        Swal.fire({
          title: 'Token inválido.',
          text: 'Por favor, verifica tus credenciales.',
          confirmButtonColor: 'red',
          icon: 'info',
          iconColor: 'red'
        });
      }

      // Manejar errores genéricos (400 o 500)
      if (status === 400 || status === 500) {
        /**
         * Construye un mensaje de error priorizando diferentes fuentes de información del error.
         * - Primero, intenta obtener la propiedad `message` del objeto `error.response.data`.
         * - Si la propiedad `message` no está disponible, verifica el primer `message` en el array `errors` dentro de `error.response.data`.
         * - Si ninguna de las anteriores está disponible, utiliza como alternativa una variable previamente definida `errorMessage`.
         *
         * Esta lógica asegura que se capture y muestre el mensaje de error más relevante.
         */
        const errorMessage = error.response.data?.message || error.response.data?.errors?.[0]?.message || errorMessage;
        enqueueSnackbar({
          message: `${errorMessage}`,
          variant: 'error',
          anchorOrigin: { horizontal: 'center', vertical: 'top' } // Configuración de la posición de la notificación
        });
      }
    }
  }
);