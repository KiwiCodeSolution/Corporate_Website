'use client';

import clsx from 'clsx';
import { ComponentType, SVGProps, MouseEvent } from 'react';
import { Link } from '@/i18n/navigation';

type IconLinkProps = {
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  className?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconProps?: Record<string, unknown>;
  locale: 'ua' | 'en';
  href: string;
  // target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
};

const sizeMap = {
  s: 'w-[44px] h-[44px]',
  m: 'w-[48px] h-[48px]',
  l: 'w-[50px] h-[50px]',
};

export default function IconLink({
  size = 'm',
  disabled = false,
  className = '',
  icon: Icon,
  iconProps,
  locale,
  href,
  // target,
}: IconLinkProps) {
  const handleClick = (e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link
      href={href}
      locale={locale}
      aria-disabled={disabled}
      onClick={handleClick}
      className={clsx(
        sizeMap[size],
        'flex justify-center items-center rounded-full base-transition',
        'bg-accent hover:shadow-base cursor-pointer',
        'outline-[2px] outline-offset-[2px] outline-transparent focus:outline-blue',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50 shadow-none bg-disabled',
        className
      )}
      // target={target}
    >
      <Icon {...iconProps} />
    </Link>
  );
}
