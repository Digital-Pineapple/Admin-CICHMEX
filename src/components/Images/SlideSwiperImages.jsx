import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const SlideSwiperImages = ({ images }) => {

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  function sliders() {
    return images.map((item, index) => (
      <SwiperSlide key={index}>
        <img  src={item.url} alt={`Imagen ${index}`} style={{objectFit:'contain'}}  />
      </SwiperSlide>
    ));
  }

  return (
    <>
      <Swiper
        pagination={pagination}
        style={{maxHeight:'200px'}}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {sliders()}
      </Swiper>
    </>
  );
};

export default SlideSwiperImages;
