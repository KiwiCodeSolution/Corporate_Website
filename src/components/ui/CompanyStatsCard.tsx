'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export type CompanyStatsCardProps = {
  statNumber: number | string;
  statCaption: string;
  isAccented: boolean;
};

export default function CompanyStatsCard(props: CompanyStatsCardProps & { className?: string }) {
  const { statNumber, statCaption, isAccented, className = '' } = props;

  const t = useTranslations('About');

  return (
    <div
      className={clsx(
        isAccented ? 'base-gradient outline-transparent' : 'bg-bgColor outline-[#5BD18799]',
        'w-full h-full  px-6 md:px-8 py-4 md:py-8 flex flex-col gap-3 md:gap-4 rounded-[20px] outline-1',
        className
      )}
    >
      <span
        className={clsx(
          'text-[54px] md:text-[58px] font-bold leading-[1.3]', //leading-0.75
          isAccented
            ? 'text-white'
            : 'bg-linear-to-b from-[#5BD187] to-blue bg-clip-text text-transparent'
        )}
      >
        {statNumber + '+'}
      </span>
      <span
        className={clsx(
          isAccented ? 'text-white' : 'text-main',
          'text-[16px] md:text-[18px] font-medium leading-[1.4]'
        )}
      >
        {t(statCaption)}
      </span>
    </div>
  );
}
