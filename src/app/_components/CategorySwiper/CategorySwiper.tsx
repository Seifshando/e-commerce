'use client'
import React from 'react'
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules'
import  Image  from 'next/image';
import { CategoryType } from '@/types/category.type';


export default function CategorySwiper({data} : {data : CategoryType[]}) {
return <>
<div className='w-[80%] mx-auto'>
    <div className='text-slate-500'>
    CategorySlider
    </div>


            <Swiper
                spaceBetween={0}
                slidesPerView={7}
                modules={[Autoplay]}
                autoplay = {{delay : 2000}}
                >
                {data.map((category) => (
                    <>
                    <SwiperSlide key={category._id}><Image src={category.image} alt="ayHAga" width={500} height={500} className='w-full h-[150px] object-cover my-4' /></SwiperSlide>
                    <p>{category.name}</p>
                    </>
                ))}
                
            </Swiper>
</div>
</>
}
