import axios from 'axios';
import Swal from 'sweetalert2';


export const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instanceApi.interceptors.response.use (
  response => response,
  error =>{
    if (error.response) {
      const { status, data } = error.response
            // Verificar si el token ha expirado
            if (status === 498 && data.message === 'El token ha expirado') {
              Swal.fire({title:'Tu sesión ha expirado', text:'Por favor, inicia sesión nuevamente.', confirmButtonColor:'red', icon:'info', iconColor:'red', willClose:(()=>window.location.href = '/login')})
              localStorage.removeItem('token')
             ;
            
          }
          if (status === 401 && data.message === 'Token inválido o no autorizado') {
            Swal.fire({title:'Token inválido.', text:'Por favor, verifica tus credenciales.', confirmButtonColor:'red', icon:'info', iconColor:'red'})
             
          }
          if (status === 400 || status === 500){
           const errorMessage = error.response.data?.message || error.response.data?.errors?.[0]?.message || errorMessage;
            Swal.fire({title:`${errorMessage}`, confirmButtonColor:'red', icon:'info', iconColor:'red'})
          }

    }
   
  }
  
)