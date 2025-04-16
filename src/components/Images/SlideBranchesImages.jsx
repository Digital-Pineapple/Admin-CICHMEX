import React from "react";
// Importa los componentes de Swiper para crear carruseles
import { Swiper, SwiperSlide } from "swiper/react";

// Importa los estilos necesarios para Swiper
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

// Componente SlideBranchesImages que recibe las propiedades: image, images y altura
export const SlideBranchesImages = ({ image, images, altura }) => {
  return (
    <>
      {/* Componente Swiper: Configuración del carrusel */}
      <Swiper
        navigation={true} // Habilita la navegación (botones de siguiente/anterior)
        style={{ height: altura, backgroundColor: "white", maxWidth:'350px' }} // Estilo del carrusel
        centeredSlides={true} // Centra las diapositivas
        spaceBetween={30} // Espaciado entre diapositivas
        modules={[Navigation, Pagination]} // Módulos habilitados: navegación y paginación
        pagination={{
          type: 'progressbar', // Tipo de paginación: barra de progreso
        }}
        loop={true} // Habilita el bucle infinito
        slidesPerView={1} // Muestra una diapositiva a la vez
      >
        {/* Si se proporciona una imagen única */}
        {image ? (
          <SwiperSlide>
            {/* Muestra la imagen única */}
            <img
              src={image}
              style={{
                height: altura, // Altura de la imagen
                width: "100%", // Ancho de la imagen
                objectFit:'scale-down' // Ajusta la imagen sin recortarla
              }}
            />
          </SwiperSlide>
        ) : (
          // Si no hay una imagen única, se recorren las imágenes del array
          images?.map((item, index) => {
            return (
              <SwiperSlide
                key={index} // Clave única para cada diapositiva
                style={{maxWidth:'100vw'}} // Estilo de la diapositiva
              >
                {/* Muestra cada imagen del array */}
                <img
                  src={item}
                  style={{
                    height: altura, // Altura de la imagen
                    width: "100%", // Ancho de la imagen
                    objectFit:'scale-down' // Ajusta la imagen sin recortarla
                  }}
                />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </>
  );
};
