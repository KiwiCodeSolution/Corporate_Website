'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Bracket } from '@/assets/icons/icons';
import NewsCard, { NewsItem } from './NewsCard';
import IconButton from './ui/buttons/IconButton';

import '../styles/news.css';
import AllCasesLink from './ui/links/AllCasesLink';

type NewsCarrouselProps = {
  newsArray: NewsItem[];
  locale: 'ua' | 'en';
};

export default function NewsCarrouselComponent({ newsArray, locale }: NewsCarrouselProps) {
  return (
    <div className="relative">
      <Swiper
        loop={true}
        pagination={{
          el: '.custom-pagination-news',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet swiper-pagination-bullet "></span>`;
          },
        }}
        modules={[Navigation, Pagination]}
        className="news-slick"
        navigation={{
          nextEl: '.news-slick-next',
          prevEl: '.news-slick-prev',
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {newsArray.map((n) => (
          <SwiperSlide key={n.date + n.title}>
            <NewsCard news={n} locale={locale} section="card" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-controls">
        <IconButton
          size="l"
          className={`btn-swiper news-slick-prev`}
          icon={Bracket}
          iconProps={{ white: true, className: 'rotate-180' }}
        />
        <div className="custom-pagination custom-pagination-news" />
        <IconButton
          size="l"
          className={`btn-swiper news-slick-next`}
          icon={Bracket}
          iconProps={{ white: true }}
        />
      </div>

      <AllCasesLink
        href="/news"
        locale={locale}
        className={
          'w-full md:w-fit xl:w-[156px] absolute bottom-[-80px] md:bottom-0 right-0 z-[10] justify-center'
        }
        section="news"
      />
    </div>
  );
}
