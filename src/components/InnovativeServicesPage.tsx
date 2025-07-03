import Image from 'next/image';
import { useTranslations } from 'next-intl';
import InnovativeServicesOpenModalBnt from './InnovativeServicesOpenModalBnt';

const InnovativeServicesPage = ({ showImage }: { showImage: boolean }) => {
  const t = useTranslations('Services_Page');

  return (
    <div
      className="w-full rounded-base relative p-10 xl:py-[89px] xl:px-10 flex gap-x-[74px] xl:gap-x-[38px] bg-bgColor "
      style={{ boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.14)' }}
    >
      <div className="h-fit relative z-[1]">
        <p className="text-[28px] xl:text-[40px] font-semibold leading-[1.4] w-[250px] xl:w-[522px] text-dark dark:text-main-text">
          {t.rich('innovate_title', {
            highlight: (chunks) => (
              <span className="inline-block bg-linear-to-b from-[#5BD187] to-blue xl:leading-[0.85] bg-clip-text text-transparent">
                {chunks}
              </span>
            ),
          })}
        </p>
        <svg
          width="284"
          height="10"
          viewBox="0 0 284 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-[-6px] left-[124px]"
        >
          <path
            d="M2.63477 7.0911C110.089 -1.17431 233.387 3.64718 281.604 7.0911"
            stroke="#4AB88B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <InnovativeServicesOpenModalBnt text={t('innovate_text')} btnText={t('innovate_btn')} />

      <Image
        src="/images/services/hand_innovate.png"
        alt="robots hand"
        width={510}
        height={470}
        className={`absolute right-[-120px] bottom-0 z-[0] transition-opacity duration-700 ease-out w-[470px] h-auto xl:w-[510px] xl:h-[470px] ${
          showImage ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default InnovativeServicesPage;
