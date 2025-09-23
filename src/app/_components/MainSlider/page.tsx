'use client'
import React from 'react'
import img1 from '../../../../public/imgs/blog-1.jpg'
import img2 from '../../../../public/imgs/blog-2.jpg'
import img3 from '../../../../public/imgs/blog-3.jpg'
import img4 from '../../../../public/imgs/2.jpg'
import img5 from '../../../../public/imgs/4.jpg'
import  Image  from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules'

// Import Swiper styles


export default function MainSlider() {
  return <>

    <div className='w-[80%] mx-auto my-4 flex bg-amber-800'>
        <div className="w-3/4">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay = {{delay : 2000}}
            >
                <SwiperSlide><Image src={img1} alt="ayHAga" className='w-full h-[400px] ' /></SwiperSlide>
                <SwiperSlide><Image src={img2} alt="ay" className='w-full h-[400px] ' /></SwiperSlide>
                <SwiperSlide><Image src={img3} alt="ayAga" className='w-full h-[400px] ' /></SwiperSlide>
                
            </Swiper>
        </div>
        <div className="w-1/4">
            <Image src={img4} alt="ayHAga" width={500} height={500} className=' w-full h-[200px]' />
            <Image src={img5} alt="ayHAga"  className=' w-full h-[200px]' />
        </div>
    </div>
  </>
}
