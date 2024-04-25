import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

export const SlideBranchesImages = ({image, images, altura}) => {
  return (
    <>
      <Swiper navigation={true} className='mySwiper' style={{height: altura, backgroundColor:'white'}}  modules={[Navigation]}>
        {
          image?
          <SwiperSlide>
            <img src={image} 
                style={{ 
                  height: altura, 
                  width:'100%'
                  }}
            />
          </SwiperSlide>
         :
          images?.map((item, index)=>{
             return(
               <SwiperSlide key={index}
                // style={{width:'100%'}}
                >
                <img src={item} 
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

