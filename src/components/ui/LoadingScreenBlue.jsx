import { ThreeDots } from 'react-loader-spinner'
import { Box, CssBaseline, useTheme } from '@mui/material'

// Componente funcional que representa una pantalla de carga con un fondo azul
const LoadingScreenBlue = () => {
    // Hook para acceder al tema actual de Material-UI
    const theme = useTheme();

    return (
        // Contenedor principal con estilos para centrar el contenido en la pantalla
        <Box sx={{
            width: '100%', // Ocupa el ancho completo de la pantalla
            zIndex: 99, // Asegura que el componente esté en el frente
            position: 'fixed', // Fija el componente en la pantalla
            display: 'flex', // Usa flexbox para el diseño
            height: '100%', // Ocupa el alto completo de la pantalla
            alignItems: 'center', // Centra los elementos horizontalmente
            justifyContent: 'center', // Centra los elementos verticalmente
            flexDirection: 'column' // Organiza los elementos en columna
        }}>
            {/* Restablece los estilos base de Material-UI */}
            <CssBaseline />
            {/* Componente de animación de carga con tres puntos */}
            <ThreeDots
                visible={true} // Hace visible la animación
                height="250" // Altura del componente
                width="250" // Ancho del componente
                color={theme.palette.primary.main} // Usa el color principal del tema
            />
        </Box>
    )
}

export default LoadingScreenBlue
