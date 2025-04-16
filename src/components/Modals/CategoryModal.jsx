import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material';
import { cloneElement, forwardRef } from 'react';

// Componente personalizado para animación de desvanecimiento (Fade) utilizando react-spring
const Fade = forwardRef(function Fade(props, ref) {
  const {
    children, // Elemento hijo que se renderiza dentro del componente
    in: open, // Indica si el modal está abierto o cerrado
    onClick, // Evento de clic
    onEnter, // Función que se ejecuta al iniciar la animación de entrada
    onExited, // Función que se ejecuta al finalizar la animación de salida
    ownerState, // Estado del propietario (no se utiliza en este caso)
    ...other // Otros props adicionales
  } = props;

  // Configuración de la animación de desvanecimiento
  const style = useSpring({
    from: { opacity: 0 }, // Estado inicial (opacidad 0)
    to: { opacity: open ? 1 : 0 }, // Estado final (opacidad 1 si está abierto, 0 si está cerrado)
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true); // Llama a la función onEnter si está definida
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true); // Llama a la función onExited si está definida
      }
    },
  });

  return (
    // Renderiza el elemento animado con los estilos aplicados
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })} {/* Clona el elemento hijo y agrega el evento onClick */}
    </animated.div>
  );
});

// Definición de los tipos de propiedades para el componente Fade
Fade.propTypes = {
  children: PropTypes.element.isRequired, // El hijo debe ser un elemento React
  in: PropTypes.bool, // Indica si el modal está abierto o cerrado
  onClick: PropTypes.any, // Evento de clic
  onEnter: PropTypes.func, // Función que se ejecuta al iniciar la animación
  onExited: PropTypes.func, // Función que se ejecuta al finalizar la animación
  ownerState: PropTypes.any, // Estado del propietario (opcional)
};

// Estilos personalizados para el modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // Centra el modal en la pantalla
  width: 400, // Ancho del modal
  bgcolor: 'background.paper', // Color de fondo
  borderRadius: '20px', // Bordes redondeados
  boxShadow: 24, // Sombra del modal
  p: 4, // Padding interno
};

// Componente principal del modal de categoría
const CategoryModal = ({ category, open, handleClose }) => {    
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title" // Etiqueta de accesibilidad para el título
        aria-describedby="spring-modal-description" // Etiqueta de accesibilidad para la descripción
        open={open} // Controla si el modal está abierto o cerrado
        onClose={handleClose} // Función que se ejecuta al cerrar el modal
        closeAfterTransition // Cierra el modal después de la transición
        slots={{ backdrop: Backdrop }} // Define el componente de fondo (Backdrop)
        slotProps={{
          backdrop: {
            TransitionComponent: Fade, // Aplica la animación personalizada al fondo
          },
        }}
      >
        <Fade in={open}> {/* Aplica la animación de desvanecimiento al contenido del modal */}
          <Card sx={style} variant="outlined"> {/* Tarjeta que contiene el contenido del modal */}
            <CardHeader
              action={
                <IconButton onClick={() => handleClose()} aria-label="Cerrar"> {/* Botón para cerrar el modal */}
                  <Close />
                </IconButton>
              }
              title={`Nombre: ${category.name}`} // Muestra el nombre de la categoría
            />
            <CardMedia 
              sx={{ borderRadius: '10px' }} // Estilo para redondear las esquinas de la imagen
              component={'img'} // Define que el componente es una imagen
              title="Imagen" // Título de la imagen
              image={category.category_image} // Fuente de la imagen
            />
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}

// Exporta el componente para su uso en otras partes de la aplicación
export default CategoryModal;
