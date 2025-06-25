'use client';

import clsx from 'clsx';
import { ReactElement } from 'react';

export type PillButtonProps = {
  size?: 's' | 'm' | 'l';
  variant?: 'primary' | 'secondary';
  className?: string;
  icon?: (props: { className?: string; [key: string]: string | boolean | number }) => ReactElement;
  loader?: (props: {
    className?: string;
    [key: string]: string | boolean | number;
  }) => ReactElement;
  iconClassName?: string;
  iconProps?: { [key: string]: string | boolean | number };
  buttonProps?: { [key: string]: string | boolean | number };
  children?: ReactElement | string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

const sizeMap = {
  s: 'h-[40px]',
  m: 'h-[44px]',
  l: 'h-[48px]',
};

const variantMap = {
  primary: 'bg-gradient-to-b from-[#5BD187] to-blue text-[23px] font-semibold',
  secondary: 'bg-accent text-[20px] font-medium',
};

export default function PillButton(props: PillButtonProps) {
  const {
    size = 's',
    variant = 'primary',
    className = '',
    icon: Icon = null,
    loader: Loader = null,
    iconClassName = '',
    iconProps = {},
    buttonProps = {},
    children,
    disabled = false,
    isLoading = false,
    onClick,
  } = props;

  function clickHandler(e) {
    e.currentTarget.blur();
    if (!onClick) return;
    onClick();
  }

  return (
    <button
      className={clsx(
        sizeMap[size],
        variantMap[variant],
        disabled ? 'pointer-events-none' : 'pointer-events-auto',
        'rounded-full px-10 text-white hover:shadow-base base-transition',
        'disabled:opacity-50 disabled:cursor-default disabled:hover:shadow-none',
        'outline-[2px] outline-offset-[2px] outline-transparent focus:outline-blue',
        className
      )}
      disabled={disabled}
      onClick={clickHandler}
      {...buttonProps}
    >
      <div className="flex justify-center items-center gap-3">
        <span>{children}</span>
        {Loader && isLoading ? (
          <Loader color="white" size={24} />
        ) : (
          Icon && <Icon {...iconProps} className={iconClassName} />
        )}
      </div>
    </button>
  );
}
