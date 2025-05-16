'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Title from './Title';
import HowWeWorkImgBlock from './HowWeWorkImgBlock';
import { IPrinciple } from './sections/HowWeWork';
import HowWeWorkCarrouselComponent from './HowWeWorkCarrouselComponent';

type HowWeWorkGalleryProps = {
  items: IPrinciple[];
};

const HowWeWorkGallery = ({ items }: HowWeWorkGalleryProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const [currentItem, setCurrentItem] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const isDesktop = window.innerWidth >= 1280;
    if (!isDesktop) return;

    const handleScroll = (e: WheelEvent) => {
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
  }, [isMounted, items.length]);

  return (
    <div
      ref={containerRef}
      className="flex items-center xl:ml-[47px] xl:gap-x-[74px] justify-between relative z-[10] w-full mx-auto"
    >
      <div className="hidden xl:inline-block w-[1px] h-[440px] rounded-[1px] absolute top-1/2 -translate-y-1/2 -left-[42px] bg-[#E6E9EA]" />

      <ul className="hidden w-[314px] h-full xl:flex flex-col gap-y-[25px]">
        {items.map((el, index) => (
          <li
            key={el.id}
            className={`${currentItem !== index ? 'opacity-30' : 'opacity-100'} relative transition-opacity duration-300`}
          >
            {currentItem === index && (
              <div className="absolute top-1/2 -translate-y-1/2 -left-[44px] w-[5px] h-20 rounded-[3px] bg-[#5BD187]" />
            )}

            <Title styles={'mb-2'}>{el.title}</Title>
            <p className="line-clamp-3 text-main-dark-grey">{el.text}</p>
          </li>
        ))}
      </ul>

      {isMounted && (
        <div
          className={`hidden xl:w-[630px] xl:h-[461px] xl:flex items-end relative rounded-base overflow-hidden p-6 md:p-10 my-auto transition-opacity duration-2000 ease-in-out`}
        >
          <HowWeWorkImgBlock items={items} theme={theme} currentItem={currentItem} />
        </div>
      )}

      {isMounted && <HowWeWorkCarrouselComponent items={items} theme={theme} />}
    </div>
  );
};

export default HowWeWorkGallery;
