import Image from 'next/image';
import SocIconsList from './SocIconsList';

const ProcessSocialMedia = ({ theme }: { theme: string }) => {
  return (
    <div className="w-full h-20 relative">
      <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-between pt-[2.5px] pb-[6.5px]">
        <p className="text-sm font-medium mb-[2.5px]">Social media</p>
        <div className="h-12 flex items-center justify-center">
          <SocIconsList />
        </div>
      </div>
      <Image
        src={
          theme === 'dark'
            ? '/images/services/background-4st-part_dark.png'
            : '/images/services/background-4st-part.png'
        }
        width={256}
        height={80}
        className="w-full xl:w-[256px] h-full xl:h-20"
        alt=""
      />
    </div>
  );
};

export default ProcessSocialMedia;
