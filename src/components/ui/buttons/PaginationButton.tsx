'use client';

import clsx from 'clsx';
import { Prev, Next } from '@/assets/icons/icons';

type PaginationButtonProps = {
  variant?: 'number' | 'control';
  direction?: 'left' | 'right'; //only for control
  disabled?: boolean;
  isCurrent?: boolean; //only for number
  Icon?: React.FC<{ className?: string }>;
  pageNumber?: string | number;
  onClick?: () => void;
};

const variantMap = {
  number: 'bg-main text-bgColor hover:text-accent disabled:hover:text-bgColor',
  control: 'bg-accent text-white hover:shadow-base disabled:hover:shadow-none',
};

export default function PaginationButton({
  variant = 'number',
  direction = 'right',
  disabled = false,
  isCurrent = false,
  Icon,
  pageNumber = 1,
  onClick,
}: PaginationButtonProps) {
  function clickHandler(e) {
    e.currentTarget.blur();
    if (!onClick) return;
    onClick();
  }

  const AutoSelectedIcon = Icon ?? (direction === 'left' ? Prev : Next);
  const isPageNumberExist = pageNumber ?? false;

  console.log('isCurrent :>> ', isCurrent);
  console.log('variant: ', variantMap[variant]);

  return (
    <button
      className={clsx(
        'ml-10 flex justify-center items-center size-[32px] rounded-[4px] cursor-pointer base-transition',
        'outline-[2px] outline-offset-[2px] outline-transparent focus:outline-blue',
        'disabled:cursor-default disabled:bg-disabled',
        variantMap[variant],
        {
          'border-[1px] border-accent': variant === 'number' && isCurrent && !disabled,
        }
      )}
      disabled={disabled}
      onClick={clickHandler}
    >
      {variant === 'control' && <AutoSelectedIcon />}
      {variant === 'number' && isPageNumberExist && (
        <span className="text-[14px] font-semibold">{pageNumber}</span>
      )}
    </button>
  );
}
