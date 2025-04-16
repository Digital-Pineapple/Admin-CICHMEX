import { Swiper, SwiperSlide } from "swiper/react"; // Importa los componentes principales de Swiper
import { Pagination, Navigation } from "swiper/modules"; // Importa los módulos de paginación y navegación de Swiper

// Componente SlideSwiperImages que recibe un arreglo de imágenes como prop
const SlideSwiperImages = ({ images }) => {

  // Configuración de la paginación personalizada
  const pagination = {
    clickable: true, // Permite que los indicadores de paginación sean clicables
    renderBullet: function (index, className) {
      // Renderiza los indicadores de paginación con números
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  // Función que genera los slides dinámicamente a partir del arreglo de imágenes
  function sliders() {
    return images.map((item, index) => (
      <SwiperSlide key={index}> {/* Cada imagen se envuelve en un SwiperSlide */}
        <img 
          src={item.url} // URL de la imagen
          alt={`Imagen ${index}`} // Texto alternativo para la imagen
          style={{ objectFit: 'contain' }} // Ajusta la imagen para que se contenga dentro del contenedor
        />
      </SwiperSlide>
    ));
  }

  // Renderiza el componente Swiper con las configuraciones y los slides generados
  return (
    <>
      <Swiper
        pagination={pagination} // Configuración de la paginación
        style={{ maxHeight: '200px' }} // Estilo para limitar la altura máxima del Swiper
        navigation={true} // Habilita los botones de navegación (anterior/siguiente)
        modules={[Pagination, Navigation]} // Registra los módulos de paginación y navegación
      >
        {sliders()} {/* Renderiza los slides generados */}
      </Swiper>
    </>
  );
};

export default SlideSwiperImages; // Exporta el componente para su uso en otros archivos
