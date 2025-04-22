'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';

const localeStyle = 'group flex items-center cursor-pointer';
const localeTextStyle =
  'h-[20px] text-[20px] leading-[1] font-normal transition-all duration-200 ease-in-out group-hover:border-b-1 peer-focus:border-b-1';

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
        <input
          type="radio"
          name="locale"
          value="ua"
          checked={params.locale === 'ua'}
          tabIndex={params.locale === 'ua' ? 0 : 1}
          onChange={localeChangeHandler}
          className="sr-only peer"
        />
        <span className={clsx(localeTextStyle, params.locale === 'ua' && 'text-[var(--accent)]')}>
          UA
        </span>
      </label>
      <label className={clsx(localeStyle, 'border-l-[0.5px] pl-[3px]')}>
        <input
          type="radio"
          name="locale"
          value="en"
          checked={params.locale === 'en'}
          tabIndex={params.locale === 'en' ? 0 : 1}
          onChange={localeChangeHandler}
          className="sr-only peer"
        />
        <span className={clsx(localeTextStyle, params.locale === 'en' && 'text-[var(--accent)]')}>
          EN
        </span>
      </label>
    </div>
  );
}
