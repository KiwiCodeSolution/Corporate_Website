'use client';
import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';
import clsx from 'clsx';
import { ANIMATION_DURATION_MS } from '@/configs/animationConfig';
import IPhone from '../../public/images/iphone.png';
import Title from './Title';
import '../styles/principles.css';
import PhoneContent from './PhoneContent';

export type PrinciplesItems = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  iconProps?: { [key: string]: string | boolean | number };
};

type PrinciplesProps = {
  principles: PrinciplesItems[];
};

const OurPrinciplesSectionComponent = ({ principles }: PrinciplesProps) => {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % principles.length);
    }, ANIMATION_DURATION_MS);

    return () => clearInterval(interval);
  }, [principles.length]);

  return (
    <div className="flex flex-col md:flex-row gap-8 xl:gap-x-[104px] xl:gap-y-0 items-center justify-center">
      {/* секція із телефоном */}

      <div className="w-[320px] flex items-center justify-between relative order-2 md:order-1">
        {/* Обгортка з тінню */}

        <div className="absolute top-0 left-[4px] shadow-wrapper" />
        {/* маска телефона із градієнтрим фоном */}

        <div className="principles-iphone-wrapper">
          <div className="principles-screen-mask">
            <div
              className={clsx(
                'absolute inset-0 transition-opacity duration-700 ease-in-out',
                currentItem === 2
                  ? 'principles-bg-gradient-second'
                  : currentItem === 3
                    ? 'principles-bg-gradient-third'
                    : 'principles-bg-gradient-first'
              )}
            />

            {/* тут ренедяриться зображення */}
            <PhoneContent currentItem={currentItem} />
          </div>
          {/* саме зображення телефону */}
          <Image
            src={IPhone}
            alt="Principles"
            width={320}
            height={660}
            className="relative z-[5]"
          />
        </div>
      </div>

      {/* блок із текстовим наповненням */}
      <div className="w-full md:min-w-[364px] md:max-w-[500px] xl:w-[616px] flex flex-col gap-y-12 order-1 md:order-2">
        <Title tag="h2">Our Principles</Title>

        {/* текст пунктів */}
        <ul className="w-full flex flex-col gap-y-8">
          {principles.map((item, index) => {
            const isActive = index === currentItem;

            return (
              <li
                key={item.id}
                className={clsx(
                  'w-full flex gap-x-4 xl:gap-x-10',
                  'transition-opacity duration-700 ease-in-out',
                  isActive ? 'opacity-100' : 'opacity-50'
                )}
              >
                {/* іконка + зміна градієнту та заливки при анімації */}
                <div className="flex-none relative w-[50px] h-[50px] rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'absolute inset-0 transition-opacity duration-700 ease-in-out',
                      isActive ? 'opacity-100 base-gradient' : 'opacity-0'
                    )}
                  />
                  <div
                    className={clsx(
                      'absolute inset-0 transition-opacity duration-700 ease-in-out bg-grey',
                      isActive ? 'opacity-0' : 'opacity-100'
                    )}
                  />
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    {item.icon}
                  </div>
                </div>

                {/* текст пунктів */}
                <div className="flex flex-col gap-y-2 flex-1 max-w-[281px] md:max-w-[400px] xl:max-w-[526px]">
                  <Title
                    tag="h3"
                    styles={clsx('transition-colors duration-700 ease-in-out text-main-title')}
                  >
                    {item.title}
                  </Title>
                  <p className={clsx('transition-colors duration-700 ease-in-out text-main-text')}>
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OurPrinciplesSectionComponent;
