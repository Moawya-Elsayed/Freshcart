
"use client"
import Image from 'next/image';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import img5 from "../../../../public/images/grocery-banner-2.jpeg";
import img4 from "../../../../public/images/grocery-banner.png";
import img1 from "../../../../public/images/slider-image-1.jpeg";
import img2 from "../../../../public/images/slider-image-2.jpeg";
import img3 from "../../../../public/images/slider-image-3.jpeg";

export default function MainSlider() {
    return (
        <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto my-6 bg-gray-100 dark:bg-[#020617]">
            <div className="flex flex-col lg:flex-row">
                
                <div className="w-full lg:w-3/4">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false
                        }}
                    >
                        <SwiperSlide> <Image priority className="w-full h-64 sm:h-80 md:h-96 lg:h-[96] object-cover" src={img1} alt="img1" /> </SwiperSlide>
                        <SwiperSlide> <Image priority className="w-full h-64 sm:h-80 md:h-96 lg:h-[96] object-cover" src={img2} alt="img2" /> </SwiperSlide>
                        <SwiperSlide> <Image priority className="w-full h-64 sm:h-80 md:h-96 lg:h-[96] object-cover" src={img3} alt="img3" /> </SwiperSlide>
                    </Swiper>
                </div>

                <div className="w-full lg:w-1/4 flex flex-col"> 
                    <Image priority className="w-full h-32 sm:h-40 md:h-48 lg:h-52 object-cover" src={img4} alt="img4" />
                    <Image priority className="w-full h-32 sm:h-40 md:h-48 lg:h-52 object-cover" src={img5} alt="img5" />
                </div>

            </div>
        </div>
    );
}
