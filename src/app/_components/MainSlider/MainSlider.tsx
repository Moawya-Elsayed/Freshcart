"use client"

import Image from "next/image"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import img5 from "../../../../public/images/grocery-banner-2.jpeg"
import img4 from "../../../../public/images/grocery-banner.png"
import img1 from "../../../../public/images/slider-image-1.jpeg"
import img2 from "../../../../public/images/slider-image-2.jpeg"
import img3 from "../../../../public/images/slider-image-3.jpeg"

export default function MainSlider() {
  return (
    <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto my-6 bg-gray-100 dark:bg-[#020617]">
      
      <div className="flex gap-2 h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px]">

        <div className="w-3/4 h-full">
          <Swiper
            className="h-full"
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide className="h-full">
              <Image
                priority
                src={img1}
                alt="img1"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide className="h-full">
              <Image
                priority
                src={img2}
                alt="img2"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide className="h-full">
              <Image
                priority
                src={img3}
                alt="img3"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* العمود اللي فيه الصورتين */}
        <div className="w-1/4 h-full flex flex-col gap-2">
          <div className="flex-1">
            <Image
              src={img4}
              alt="img4"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <Image
              src={img5}
              alt="img5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  )
}