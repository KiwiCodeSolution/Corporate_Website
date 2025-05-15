'use client';
import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';
import IPhone from '../../public/images/iphone.png';
import Title from './Title';
import '../styles/principles.css';
import clsx from 'clsx';
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
  const [currentItem, setCurrentItem] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % principles.length);
    }, 6000);

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
          {principles.map((item, index) => (
            <li key={item.id} className="w-full flex gap-x-10">
              <div
                className={clsx(
                  'w-[50px] h-[50px] rounded-full flex items-center justify-center',
                  currentItem === index && 'base-gradient',
                  currentItem !== index && 'bg-main-grey'
                )}
              >
                {item.icon}
              </div>

              <div
                className={clsx(
                  'w-[calc(100%-50px-40px)] flex flex-col gap-y-2',
                  currentItem === index && 'opacity-100',
                  currentItem !== index && 'opacity-50'
                )}
              >
                <Title
                  tag="h3"
                  styles={clsx(
                    currentItem === index && 'text-main',
                    currentItem !== index && 'text-[#22282B]'
                  )}
                >
                  {item.title}
                </Title>
                <p
                  className={clsx(
                    currentItem === index && 'text-main-dark-grey',
                    currentItem !== index && 'text-main'
                  )}
                >
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OurPrinciplesSectionComponent;
