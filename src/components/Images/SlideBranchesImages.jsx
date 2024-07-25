import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

export const SlideBranchesImages = ({ image, images, altura }) => {
  return (
    <>
      <Swiper
        navigation={true}
        style={{ height: altura, backgroundColor: "white" }}
        centeredSlides={true}
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        pagination={{
          type: 'progressbar',
        }}
        loop={true}
        slidesPerView={1}
      >

        {image ? (
          <SwiperSlide>
            <img
              src={image}
              style={{
                height: altura,
                width: "100%",
                objectFit:'scale-down'
              }}
            />
          </SwiperSlide>
        ) : (
          images?.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{maxWidth:'100vw'}}
              >
                <img
                  src={item}
                  style={{
                    height: altura,
                    width: "100%",
                    objectFit:'scale-down'
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
