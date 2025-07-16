import Image from 'next/image';
import ProcessSocialMedia from './ProcessSocialMedia';

const ProcessThirdImageBlock = ({ theme }: { theme: string }) => {
  return (
    <div className="w-[256px] hidden xl:flex flex-col justify-between gap-y-4 ">
      <div className="w-full h-[448px] relative">
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
        <Image
          src="/images/services/hand.png"
          width={191}
          height={248}
          className="absolute top-[0px] left-1/2 -translate-x-1/2 z-[1] -scale-x-100 w-[191px] h-[248px]"
          alt=""
        />
        <div className="w-[230px] h-[175px] dark:bg-blue rounded-base py-4 flex flex-col gap-y-2 shadow-[4px_4px_20px_0px_rgba(0,0,0,0.15)] absolute bottom-[40px] left-1/2 -translate-x-1/2">
          <p className="text-lg font-semibold text-accent dark:text-white uppercase text-center">
            connect
          </p>
          <p className="text-base text-center leading-[1.35] tracking-tighter">
            We open the door to an exciting world of innovation and creativity, where you can find
            unique opportunities to invest in digital art.
          </p>
        </div>
      </div>
      <ProcessSocialMedia theme={theme} />
    </div>
  );
};

export default ProcessThirdImageBlock;
