            "use client"
            import { Category } from '@/types/product.type';
            import Image from 'next/image';
            import 'swiper/css';
            import { Autoplay } from 'swiper/modules';
            import { Swiper, SwiperSlide } from 'swiper/react';

            export default function CategoriesSwipper({ categories } : {categories : Category[]}) {
                return (
                    <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto my-6 dark:text-gray-200">
                        <h3 className='font-bold mb-2'>Shop Popular Categories</h3>
                        <Swiper
                            spaceBetween={16}
                            slidesPerView={2} 
                            breakpoints={{
                                640: { slidesPerView: 3 },   // sm
                                768: { slidesPerView: 4 },   // md
                                1024: { slidesPerView: 6 },  // lg
                                1280: { slidesPerView: 7 },  // xl
                            }}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false
                            }}
                        >
                            {categories.map((categ : Category, index) => (
                                <SwiperSlide key={categ._id} className="flex flex-col items-center"> <Image priority={index === 0} src={categ.image} alt="category name" width={500} height={500} className="w-full aspect-square object-cover" />
                                    <p className="text-center mt-2 text-sm sm:text-base">{categ.name}</p>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
            }
