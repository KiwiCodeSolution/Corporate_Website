import Image from 'next/image';
import CircleIcons from '@/assets/icons/CircleIcons';
import Title from './Title';

const ProcessFirstImageBlock = ({ theme }: { theme: string }) => {
  return (
    <div className="w-[340px] xl:w-[400px] rounded-base mr-2.5 relative overflow-hidden shrink">
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
  );
};

export default ProcessFirstImageBlock;
