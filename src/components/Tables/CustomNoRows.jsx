import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Estilo personalizado para el contenedor principal del componente
const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex', // Define un diseño flexible
  flexDirection: 'column', // Organiza los elementos en una columna
  alignItems: 'center', // Centra los elementos horizontalmente
  justifyContent: 'center', // Centra los elementos verticalmente
  height: '100%', // Ocupa toda la altura disponible
  '& .no-rows-primary': {
    // Define el color de los elementos primarios dependiendo del modo del tema
    fill: theme.palette.mode === 'light' ? '#AEB8C2' : '#3D4751',
  },
  '& .no-rows-secondary': {
    // Define el color de los elementos secundarios dependiendo del modo del tema
    fill: theme.palette.mode === 'light' ? '#E8EAED' : '#1D2126',
  },
}));

// Componente principal que muestra un mensaje personalizado cuando no hay filas
export default function CustomNoRows() {
  return (
    <StyledGridOverlay>
    {/* SVG que representa un ícono o ilustración para el estado "sin filas" */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={200} // Ancho del SVG
      viewBox="0 0 452 257" // Define el área visible del SVG
      aria-hidden // Indica que el SVG es decorativo y no accesible para lectores de pantalla
      focusable="false" // Evita que el SVG sea enfocado
    >
      {/* Elementos gráficos primarios */}
      <path
      className="no-rows-primary"
      d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
      />
      <path
      className="no-rows-primary"
      d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
      />
      <path
      className="no-rows-primary"
      d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
      />
      {/* Elementos gráficos secundarios */}
      <path
      className="no-rows-secondary"
      d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
      />
    </svg>
    {/* Mensaje que se muestra debajo del SVG */}
    <Box sx={{ mt: 2 }}>Sin información</Box>
    </StyledGridOverlay>
  );
}