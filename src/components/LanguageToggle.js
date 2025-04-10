'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';

const localeStyle = 'group flex items-center cursor-pointer';
const localeTextStyle =
  'text-[20px] leading-tight font-normal transition duration-200 ease-in-out group-hover:text-[var(--accent)]';

export default function LocaleToggle() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  function localeChangeHandler(e) {
    const selectedLocale = e.target.value;

    router.replace({ pathname, params }, { locale: selectedLocale });
  }

  return (
    <div className="flex h-6 ">
      <label className={clsx(localeStyle, 'border-r-[0.5px] pr-[3px]')}>
        <span className={clsx(localeTextStyle, params.locale === 'ua' && 'text-[var(--accent)]')}>
          UA
        </span>
        <input
          type="radio"
          name="locale"
          value="ua"
          onChange={localeChangeHandler}
          className="sr-only"
        />
      </label>
      <label className={clsx(localeStyle, 'border-l-[0.5px] pl-[3px]')}>
        <span className={clsx(localeTextStyle, params.locale === 'en' && 'text-[var(--accent)]')}>
          EN
        </span>
        <input
          type="radio"
          name="locale"
          value="en"
          onChange={localeChangeHandler}
          className="sr-only"
        />
      </label>
    </div>
  );
}
