'use client';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Title from './Title';

const HowWeWorkGallery = ({ items }) => {
  const { theme } = useTheme();
  const [currentItem, setCurrentItem] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Додамо перевірку на ширину екрану
    const isDesktop = window.innerWidth >= 1280;
    if (!isDesktop) return;

    const handleScroll = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;

      isScrolling.current = true;

      if (e.deltaY > 0) {
        setCurrentItem((prev) => Math.min(prev + 1, items.length - 1));
      } else {
        setCurrentItem((prev) => Math.max(prev - 1, 0));
      }

      setVisible(false);
      setTimeout(() => {
        setVisible(true);
        isScrolling.current = false;
      }, 500);
    };

    container.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center xl:ml-[47px] xl:gap-x-[74px] justify-between relative z-[1]"
    >
      <div className="hidden w-[1px] h-[440px] rounded-[1px] xl:absolute top-1/2 -translate-y-1/2 -left-[42px] bg-[#E6E9EA]" />

      <ul className="hidden w-[314px] h-full xl:flex flex-col gap-y-[25px]">
        {items.map((el, index) => (
          <li
            key={el.id}
            // onMouseEnter={() => handleItemHover(index)}
            className={`${currentItem !== index ? 'opacity-50' : 'opacity-100'} relative transition-opacity duration-300`}
          >
            {currentItem === index && (
              <div className="absolute top-1/2 -translate-y-1/2 -left-[44px] w-[5px] h-20 rounded-[3px] bg-[#5BD187]" />
            )}

            <Title styles={'mb-2'}>{el.title}</Title>
            <p className="line-clamp-3 text-main-grey">{el.text}</p>
          </li>
        ))}
      </ul>

      <div
        className={`w- [345px] h-[697px] md:w-[704px] md:h-[524px] xl:w-[630px] xl:h-[461px] flex items-end relative rounded-base overflow-hidden p-6 md:p-10 my-auto transition-opacity duration-2000 ease-in-out`}
      >
        <Image
          src={items[currentItem].img}
          width={1000}
          height={1000}
          className="w-full h-full object-center object-cover absolute top-0 left-0 transition-opacity duration-2000 ease-in-out"
          alt=""
        />
        <div className="w-full h-full absolute top-0 left-0 hww-gallery-gradient z-[2]" />
        {items[currentItem].component && currentItem === 0 && (
          <Image
            src={items[currentItem].component}
            width={600}
            height={700}
            className="w-[400px] h-[402px] absolute top-[-10px] xl:top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-2000 ease-in-out"
            alt=""
          />
        )}
        {items[currentItem].component && currentItem === 3 && (
          <Image
            src={items[currentItem].component}
            width={326}
            height={307}
            className="absolute top-[-48px] right-[-38px] transition-opacity duration-2000 ease-in-out"
            alt=""
          />
        )}
        {items[currentItem].component && (currentItem === 0 || currentItem === 3) && (
          <div className="w-full h-[55px] rounded-full absolute top-1/2 left-0 -translate-y-1/2 bg-[#68F2FF] blur-[166px] z-[4]" />
        )}
        <div
          className={`rounded-base p-6 relative z-[5] mt-auto transition-opacity duration-2000 ease-in-out ${theme === 'dark' ? 'bg-bgColor text-white' : 'bg-white text-main'}`}
        >
          <Title styles={'xl:hidden font-semibold mb-2'}>{items[currentItem].title}</Title>
          <p>{items[currentItem].text}</p>
        </div>
      </div>
    </div>
  );
};

HowWeWorkGallery.propTypes = {
  items: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    component: PropTypes.string,
  }),
};

export default HowWeWorkGallery;
