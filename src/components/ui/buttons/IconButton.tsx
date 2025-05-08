'use client';

import clsx from 'clsx';

import { ComponentType, SVGProps } from 'react';

type IconButtonProps = {
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  className?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconProps?: Record<string, unknown>;
  onClick?: () => void;
};

const sizeMap = {
  s: 'w-[44px] h-[44px]',
  m: 'w-[48px] h-[48px]',
  l: 'w-[50px] h-[50px]',
};

export default function IconButton({
  size = 's',
  disabled = false,
  className = '',
  icon: Icon,
  onClick,
  iconProps,
}: IconButtonProps) {
  function clickHandler(e) {
    e.currentTarget.blur();
    onClick?.();
  }

  return (
    <button
      type="button"
      className={clsx(
        sizeMap[size],
        'flex justify-center items-center rounded-full bg-accent hover:shadow-base cursor-pointer base-transition',
        'disabled:bg-disabled disabled: cursor-default disabled:hover:shadow-none',
        'outline-[2px] outline-offset-[2px] outline-transparent focus:outline-blue',
        className
      )}
      disabled={disabled}
      onClick={clickHandler}
    >
      <Icon {...iconProps} />
    </button>
  );
}
