'use client';
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';
import { Arrow } from '@/assets/icons/icons';
import { useEffect, useState } from 'react';

type LearnMoreLinkProps = {
  locale: 'ua' | 'en';
  href: string;
  label: string;
};

export default function LearnMoreLink({ locale, href, label }: LearnMoreLinkProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Link
      href={href}
      locale={locale}
      className={clsx(
        'absolute bottom-[60px] md:relative md:bottom-auto group flex items-center min-w-38 h-12 pl-14 pr-11 overflow-hidden rounded-full transition-colors duration-400',
        'text-main-title outline-[2px] outline-offset-[2px] outline-transparent focus:outline-blue'
      )}
    >
      <span className="absolute left-0 top-0 h-full w-12 bg-accent rounded-full transition-all duration-500 group-hover:w-full" />

      <span className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center">
        <Arrow s />
      </span>

      <span
        className={`relative z-10 transition-colors duration-300 text-main  group-hover:text-white font-semibold leading-[1.2]`}
      >
        {label}
      </span>
    </Link>
  );
}
