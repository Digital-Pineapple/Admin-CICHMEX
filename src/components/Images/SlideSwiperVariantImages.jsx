import { Swiper, SwiperSlide } from "swiper/react"; // Importa los componentes principales de Swiper
import { Pagination, Navigation } from "swiper/modules"; // Importa los módulos de paginación y navegación de Swiper

// Componente funcional para mostrar un carrusel de imágenes
const SlideSwiperVariantImages = ({ images }) => {

  // Configuración de la paginación personalizada
  const pagination = {
    clickable: true, // Permite que los puntos de paginación sean clicables
    renderBullet: function (index, className) {
      // Renderiza los puntos de paginación con números
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  // Función para generar los slides del carrusel
  function sliders() {
    return images.map((item, index) => (
      <SwiperSlide key={index}>
        {/* Renderiza cada imagen dentro de un slide */}
        <img 
          src={item} 
          alt={`Imagen ${index}`} 
          style={{ objectFit: 'contain', height: '300px', maxWidth: '300px' }} 
        />
      </SwiperSlide>
    ));
  }

  return (
    <>
      {/* Componente Swiper que contiene el carrusel */}
      <Swiper
        pagination={pagination} // Configuración de la paginación
        style={{
          maxHeight: '300px', // Altura máxima del carrusel
          maxWidth: '300px', // Ancho máximo del carrusel
          "--swiper-navigation-color": "#FFF", // Color de los botones de navegación
          "--swiper-navigation-size": "20px", // Tamaño de los botones de navegación
        }}
        navigation={true} // Habilita la navegación con botones
        loop={true} // Habilita el loop infinito del carrusel
        modules={[Pagination, Navigation]} // Importa los módulos necesarios
      >
        {sliders()} {/* Renderiza los slides generados */}
      </Swiper>
    </>
  );
};

export default SlideSwiperVariantImages; // Exporta el componente para su uso en otros archivos
