'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Bracket } from '@/assets/icons/icons';

export type LoadMoreButtonProps = {
  onClick?: () => void;
  className?: string;
};

export default function LoadMoreButton({ onClick, className = '' }: LoadMoreButtonProps) {
  const t = useTranslations('buttons');

  function clickHandler(e) {
    e.currentTarget.blur();
    if (!onClick) return;
    onClick();
  }

  return (
    <button
      type="button"
      className={clsx(
        'group h-10 px-4 rounded-full outline-[2px] outline-transparent focus:outline-blue',
        className
      )}
      onClick={clickHandler}
    >
      <div className="flex items-center gap-3">
        <span className="text-[18px] text-main">{t('loadMore')}</span>
        <Bracket
          green
          className="fill-transparent group-focus:fill-blue group-hover:fill-accent base-transition"
        />
      </div>
    </button>
  );
}
