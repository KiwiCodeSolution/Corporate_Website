'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/how-we-work.css';
import PropTypes from 'prop-types';
import { Bracket } from '@/assets/icons/icons';
import HowWeWorkImgBlock from './HowWeWorkImgBlock';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`hww-slick-next btn-swiper`} onClick={onClick}>
      <Bracket white />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={'hww-slick-prev btn-swiper'} onClick={onClick}>
      <Bracket white className={'rotate-180'} />
    </div>
  );
}

function HowWeWorkSwiper({ items, theme }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow className={'absolute bottom-0'} />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="flex flex-col">
      <div className="slider-container w-[345px] h-[697px] md:w-[704px] md:h-[524px] max-w-[767px] md:max-w-[1279px] mx-auto xl:hidden">
        <Slider {...settings} className="w-full h-full">
          {items.map((el, index) => (
            <div
              key={el.id}
              className="w-full h-full mx-auto flex flex-col items-end relative rounded-base overflow-hidden p-6 md:p-10 my-auto swiper-container"
            >
              <HowWeWorkImgBlock item={el} currentItem={index} section={'swiper'} theme={theme} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

HowWeWorkSwiper.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      component: PropTypes.string,
    })
  ),
  theme: PropTypes.string.isRequired,
};

export default HowWeWorkSwiper;
