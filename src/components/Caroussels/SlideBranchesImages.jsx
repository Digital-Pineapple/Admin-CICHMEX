import React, { useRef, useState } from 'react';
// Importa los componentes de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
// Importa los módulos requeridos
import { Navigation } from 'swiper/modules';

/**
 * Componente SlideBranchesImages
 * Este componente muestra un carrusel de imágenes utilizando la librería Swiper.
 * Puede mostrar una sola imagen o un conjunto de imágenes dependiendo de las props recibidas.
 * 
 * Props:
 * - image: (string) URL de una imagen única a mostrar.
 * - images: (array) Lista de objetos con las URLs de las imágenes a mostrar.
 * - altura: (string) Altura del carrusel.
 */
export const SlideBranchesImages = ({image, images, altura}) => {
  return (
    <>
      {/* Configuración del carrusel Swiper */}
      <Swiper 
        navigation={true} 
        className='mySwiper' 
        style={{height: altura, backgroundColor:'white'}}  
        modules={[Navigation]}
      >
        {
          image ?
          // Si se proporciona una imagen única, se muestra en un solo slide
          <SwiperSlide>
            <img 
              src={image} 
              style={{ 
                height: altura, 
                width:'100%'
              }}
            />
          </SwiperSlide>
         :
          // Si se proporciona un array de imágenes, se mapean para crear múltiples slides
          images.map((item, index) => {
             return (
               <SwiperSlide key={index}>
                 <img 
                   src={item.url} 
                   style={{ 
                     height: altura, 
                     width:'100%'
                   }}
                 />
               </SwiperSlide>
             );
          })
        }
      </Swiper>
    </>
  );
}
