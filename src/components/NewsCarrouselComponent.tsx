/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/news.css';

import { Bracket } from '@/assets/icons/icons';
import NewsCard, { NewsItem } from './NewsCard';

type NewsCarrouselProps = {
  newsArray: NewsItem[];
  locale: 'ua' | 'en';
};

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function SampleNextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div className={`news-slick-next btn-swiper`} onClick={onClick}>
      <Bracket white />
    </div>
  );
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div className={'news-slick-prev btn-swiper'} onClick={onClick}>
      <Bracket white className={'rotate-180'} />
    </div>
  );
}

function NewsCarrouselComponent({ newsArray, locale }: NewsCarrouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    nextArrow: <SampleNextArrow className={'absolute bottom-0'} />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col ">
      <div className="slider-container ">
        <Slider {...settings} className="w-[1104px] h-full mx-auto">
          {newsArray.map((n) => (
            <NewsCard news={n} locale={locale} key={n.date} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default NewsCarrouselComponent;
