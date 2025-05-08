'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { Bracket } from '@/assets/icons/icons';
import { IPrinciple } from './sections/HowWeWork';
import HowWeWorkImgBlock from './HowWeWorkImgBlock';
import '../styles/how-we-work.css';
import IconButton from './ui/buttons/IconButton';

type HowWeWorkCarrouselProps = {
  items?: IPrinciple[];
  theme: string;
};

const HowWeWorkCarrouselComponent = ({ items, theme }: HowWeWorkCarrouselProps) => {
  return (
    <div className="xl:hidden flex flex-col">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.hww-slick-next',
          prevEl: '.hww-slick-prev',
        }}
        className="slider-container w-[345px] h-[787px] md:w-[704px] md:h-[614px] max-w-[767px] md:max-w-[1279px] mx-auto relative hww-slick"
      >
        {items.map((el, index) => (
          <SwiperSlide key={el.id} className="">
            <div className="w-full h-full mx-auto flex flex-col items-end relative rounded-base overflow-hidden p-6 md:p-10 my-auto swiper-container">
              <HowWeWorkImgBlock item={el} currentItem={index} section={'swiper'} theme={theme} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton
        size="l"
        className={`btn-swiper hww-slick-next`}
        icon={Bracket}
        iconProps={{ white: true }}
      />
      <IconButton
        size="l"
        className={`btn-swiper hww-slick-prev`}
        icon={Bracket}
        iconProps={{ white: true, className: 'rotate-180' }}
      />
    </div>
  );
};

export default HowWeWorkCarrouselComponent;
