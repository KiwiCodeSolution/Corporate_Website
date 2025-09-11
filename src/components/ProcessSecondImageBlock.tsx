import Image from 'next/image';
import { AgileSprint, AgileSprintForDarkTheme } from '@/assets/icons/icons';
import ProcessSteps from './ProcessSteps';

const ProcessSecondImageBlock = ({ theme }: { theme: string }) => {
  return (
    <div className="w-[340] xl:w-[348px] xl:mr-[50px] relative flex items-center ">
      {/* текстові блоки */}
      <div className="rotate-[-90deg] absolute left-2 top-[calc(544px/2+209px/2)] origin-top-left w-[209px] h-fit px-4 py-1.5 flex items-center justify-center bg-white dark:bg-blue shadow-[4px_4px_20px_0px_rgba(0,0,0,0.15)] rounded-[8px] z-[1]">
        <p className="font-semibold text-lg whitespace-nowrap">Agile methodology</p>
      </div>
      <div className="rotate-[-90deg] absolute left-[62px] top-[210px] origin-top-left w-fit h-fit p-[2px] flex items-center justify-center dark:bg-services-blue dark:shadow-[4px_4px_20px_0px_rgba(0,0,0,0.15)] rounded-[4px] z-[1]">
        <p className="text-blue dark:text-dark font-medium text-sm whitespace-nowrap">Start</p>
      </div>
      <div className="rotate-[-90deg] absolute left-[62px] top-[422px] origin-top-left w-fit h-fit p-[2px] flex items-center justify-center dark:bg-services-blue dark:shadow-[4px_4px_20px_0px_rgba(0,0,0,0.15)] rounded-[4px] z-[1]">
        <p className="text-blue dark:text-dark font-medium text-sm whitespace-nowrap">
          Next sprint
        </p>
      </div>
      {/* основне фонове зображення */}
      <Image
        src={
          theme === 'dark'
            ? '/images/services/background-2st-part_dark.png'
            : '/images/services/background-2st-part.png'
        }
        width={348}
        height={544}
        className="w-[340px] xl:w-[348px] h-[464px] xl:h-[544px]"
        alt=""
      />
      {/* центральне зображення */}
      <Image
        src={
          theme === 'dark'
            ? '/images/services/background-2st_2-part_dark.png'
            : '/images/services/background-2st_2-part.png'
        }
        width={230}
        height={530}
        className="top-[50%] right-[47px] translate-y-[-50%] z-[1] absolute w-[158px] xl:w-[230px] h-[411px] xl:h-[530px]"
        alt=""
      />

      {/* кругова стрілка */}
      {theme === 'dark' ? (
        <AgileSprintForDarkTheme className="absolute top-[50%] right-[59px] translate-y-[-50%] z-[1]" />
      ) : (
        <AgileSprint className="absolute top-[50%] right-[59px] translate-y-[-50%] z-[1]" />
      )}
      {/* текстовий блок із кроками */}
      <ProcessSteps />
    </div>
  );
};

export default ProcessSecondImageBlock;
