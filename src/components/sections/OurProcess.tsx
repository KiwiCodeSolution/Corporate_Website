'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AgileSprint, AgileSprintForDarkTheme } from '@/assets/icons/icons';
import CircleIcons from '@/assets/icons/CircleIcons';
import Title from '../Title';

const OurProcess = () => {
  const { theme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section className="w-full min-h-[544px] my-[104px] our-process-section">
      <div className="wrapper mx-auto flex">
        {/* перше зображення */}
        <div className="w-[400px] rounded-base mr-2.5 relative overflow-hidden">
          <div className="absolute w-[200px] h-[56px] top-[33px] left-1/2 -translate-x-1/2 flex items-center justify-center bg-white dark:bg-blue shadow-[4px_4px_20px_0px_rgba(0,0,0,0.15)] rounded-2xl z-[1]">
            <Title tag="h3" styles="font-semibold">
              Our process
            </Title>
          </div>
          <Image
            src={
              theme === 'dark'
                ? '/images/services/background-1st-part_dark.png'
                : '/images/services/background-1st-part.png'
            }
            width={400}
            height={544}
            className=""
            alt=""
          />
          <Image
            src={'/images/services/girl.png'}
            width={794}
            height={394}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1]"
            alt=""
          />
          <CircleIcons
            theme={theme}
            className="absolute top-[160px] left-[34px] -rotate-[2deg] z-[1]"
          />
        </div>

        {/* друге зображення */}
        <div className="w-[348px] mr-[50px] relative">
          <div className="min-w-[209px] h-fit py-4 px-1.5 flex items-center justify-center -rotate-90 top-0 left-[8px] absolute bg-white dark:bg-blue shadow-[4px_4px_20px_0px_rgba(0,0,0,0.15)] rounded-2xl z-[1]">
            <p className="font-semibold text-lg">Agile methodology</p>
          </div>

          <Image
            src={
              theme === 'dark'
                ? '/images/services/background-2st-part_dark.png'
                : '/images/services/background-2st-part.png'
            }
            width={348}
            height={544}
            className=""
            alt=""
          />

          <Image
            src={
              theme === 'dark'
                ? '/images/services/background-2st_2-part_dark.png'
                : '/images/services/background-2st_2-part.png'
            }
            width={230}
            height={530}
            className="top-[50%] right-[47px] translate-y-[-50%] z-[1] absolute"
            alt=""
          />
          {theme === 'dark' ? (
            <AgileSprintForDarkTheme className="absolute top-[50%] right-[59px] translate-y-[-50%] z-[1]" />
          ) : (
            <AgileSprint className="absolute top-[50%] right-[59px] translate-y-[-50%] z-[1]" />
          )}
        </div>

        {/* трете зображення */}
        <div className="w-[256px] flex flex-col justify-between gap-y-4">
          <div className="w-full h-[448px]">
            <Image
              src={
                theme === 'dark'
                  ? '/images/services/background-3st-part_dark.png'
                  : '/images/services/background-3st-part.png'
              }
              width={256}
              height={448}
              className=""
              alt=""
            />
          </div>
          <div className="w-full h-20">
            <Image
              src={
                theme === 'dark'
                  ? '/images/services/background-4st-part_dark.png'
                  : '/images/services/background-4st-part.png'
              }
              width={256}
              height={80}
              className=""
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
