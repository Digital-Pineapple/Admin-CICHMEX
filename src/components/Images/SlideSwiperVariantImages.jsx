import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const SlideSwiperVariantImages = ({ images }) => {

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  function sliders() {
    return images.map((item, index) => (
      <SwiperSlide key={index}>
        <img  src={item} alt={`Imagen ${index}`} style={{objectFit:'contain', height:'300px', maxWidth:'300px'}}  />
      </SwiperSlide>
    ));
  }

  return (
    <>
      <Swiper
        pagination={pagination}
        style={{maxHeight:'300px',maxWidth:'300px',  "--swiper-navigation-color": "#FFF", "--swiper-navigation-size": "20px",}}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation]}
        
      >
        {sliders()}
      </Swiper>
    </>
  );
};

export default SlideSwiperVariantImages;
