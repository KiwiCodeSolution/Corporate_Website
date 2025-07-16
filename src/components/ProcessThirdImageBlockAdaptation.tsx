import Image from 'next/image';
import ProcessSocialMedia from './ProcessSocialMedia';

const ProcessThirdImageBlockAdaptation = ({ theme }: { theme: string }) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 xl:hidden h-[159px]">
      <div className="w-full h-full rounded-base bg-white dark:bg-[#9CB6D8] flex items-center justify-center px-6">
        <p className="text-base text-center leading-[1.35] tracking-tighter dark:text-dark">
          We open the door to an exciting world of innovation and creativity, where you can find
          unique opportunities to invest in digital art.
        </p>
      </div>
      <div className="w-full h-full rounded-base flex flex-col items-center justify-between">
        <div className="w-full h-1/2 relative">
          <Image src="/images/services/background-4st-connect.png" width={340} height={72} alt="" />
          <p className="text-lg font-semibold text-accent uppercase text-center absolute top-[14px] left-1/2 -translate-x-1/2">
            connect
          </p>
        </div>
        <ProcessSocialMedia theme={theme} />
      </div>
    </div>
  );
};

export default ProcessThirdImageBlockAdaptation;
