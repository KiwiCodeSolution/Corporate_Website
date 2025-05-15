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
    <div className="flex gap-x-[104px] items-center justify-between">
      <div className="w-[320px] flex items-center justify-between relative">
        <div className="principles-iphone-wrapper">
          <div className="principles-screen-mask">
            <div className="principles-bg-gradient" />
            <PhoneContent currentItem={currentItem} />
          </div>

          <Image
            src={IPhone}
            alt="Principles"
            width={320}
            height={660}
            className="relative z-[5]"
          />
        </div>
      </div>
      <div className="w-[616px] flex flex-col gap-y-12">
        <Title tag="h2">Our Principles</Title>
        <ul className="w-full flex flex-col gap-y-8">
          {principles.map((item, index) => {
            const isActive = index === currentItem;

            return (
              <li
                key={item.id}
                className={clsx(
                  'w-full flex gap-x-10',
                  'transition-opacity duration-700 ease-in-out',
                  isActive ? 'opacity-100' : 'opacity-50'
                )}
              >
                <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
                  <div
                    className={clsx(
                      'absolute inset-0 transition-opacity duration-700 ease-in-out',
                      isActive ? 'opacity-100 base-gradient' : 'opacity-0'
                    )}
                  />
                  <div
                    className={clsx(
                      'absolute inset-0 transition-opacity duration-700 ease-in-out',
                      isActive ? 'opacity-0 bg-main-grey' : 'opacity-100 bg-main-grey'
                    )}
                  />
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    {item.icon}
                  </div>
                </div>

                <div className="w-[calc(100%-50px-40px)] flex flex-col gap-y-2">
                  <Title
                    tag="h3"
                    styles={clsx(
                      'transition-colors duration-700 ease-in-out',
                      isActive ? 'text-main' : 'text-[#22282B]'
                    )}
                  >
                    {item.title}
                  </Title>
                  <p
                    className={clsx(
                      'transition-colors duration-700 ease-in-out',
                      isActive ? 'text-main-dark-grey' : 'text-main'
                    )}
                  >
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
