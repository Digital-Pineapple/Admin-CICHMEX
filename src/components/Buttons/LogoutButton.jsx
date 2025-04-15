import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { useAuthStore } from '../../hooks';

// Estilo personalizado para el botón utilizando la librería Emotion
const InButton = styled(Button)(() => ({
  backgroundColor: 'red',
  "&:hover": {
    backgroundColor: '#000000',
  },
}));

// Componente funcional que representa un botón de cierre de sesión
export const LogoutButton = () => {
  // Hook personalizado para manejar la lógica de autenticación
  const { startLogout } = useAuthStore();

  return (
    <>
      <InButton
        variant="outlined"
        sx={{ m: 2 }}
        onClick={startLogout} // Llama a la función para cerrar sesión al hacer clic
      >
        <Typography variant="h6" color="#00a399">
          Cerrar Sesión
        </Typography>
      </InButton>
    </>
  );
};
