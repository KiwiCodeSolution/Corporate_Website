'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Bracket } from '@/assets/icons/icons';
import '../styles/portfolio.css';

import { Link } from '@/i18n/navigation';
import IconButton from './ui/buttons/IconButton';
import AllCasesLink from './ui/links/AllCasesLink';
import { PortfolioItem } from './PortfolioCard';

type PortfolioCarrouselProps = {
  portfolioArray: PortfolioItem[];
  locale: 'ua' | 'en';
};

export default function PortfolioCarrouselComponent({
  portfolioArray,
  locale,
}: PortfolioCarrouselProps) {
  return (
    <>
      <Swiper
        loop={true}
        slidesPerView={4}
        spaceBetween={24}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{
          el: '.custom-pagination-portfolio',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet swiper-pagination-bullet "></span>`;
          },
        }}
        className="portfolio-slick ml-[-15px]"
        navigation={{
          nextEl: '.portfolio-slick-next',
          prevEl: '.portfolio-slick-prev',
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
        }}
      >
        {portfolioArray.map((p) => (
          <SwiperSlide
            key={`${p.slug}-${p.date}`}
            className="w-[560px] h-[384px] bg-transparent shadow-[0px_4px_12px_0px_rgba(0,0,0,0.14)] rounded-base overflow-hidden"
          >
            <Link href={`/portfolio/${p.slug}`} className="cursor-pointer ">
              <Image
                src={p.image || '/images/not-found.png'}
                alt={`Image for ${p.title}`}
                className="object-cover w-[560px] h-[384px]"
                style={{ objectPosition: 'center' }}
                width={560}
                height={384}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="h-[50px] wrapper relative mt-8">
        <div className="swiper-controls">
          <IconButton
            size="l"
            className="btn-swiper portfolio-slick-prev"
            icon={Bracket}
            iconProps={{ white: true, className: 'rotate-180' }}
          />
          <div className="custom-pagination custom-pagination-portfolio" />
          <IconButton
            size="l"
            className="btn-swiper portfolio-slick-next"
            icon={Bracket}
            iconProps={{ white: true }}
          />
        </div>

        <AllCasesLink
          href="/portfolio"
          locale={locale}
          className={
            'w-full md:w-fit xl:w-[170px] absolute bottom-[-80px] md:bottom-0 right-0 z-[10] justify-center'
          }
          section="portfolio"
        />
      </div>
    </>
  );
}
