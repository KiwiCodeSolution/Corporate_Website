'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';
import { Arrow } from '@/assets/icons/icons';

export default function LearnMoreLink({ locale, href, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      href={href}
      locale={locale}
      className={clsx(
        'relative group flex items-center h-12 pl-16 pr-4 overflow-hidden rounded-full transition-colors duration-400',
        'bg-transparent text-dark',
        locale === 'ua' ? 'w-[250px]' : 'w-[207px]'
      )}
    >
      <span className="absolute left-0 top-0 h-full w-12 bg-accent rounded-full transition-all duration-500 group-hover:w-full z-0" />

      <span className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center z-10">
        <Arrow s />
      </span>

      <span className="relative z-10 transition-colors duration-300 group-hover:text-white font-semibold leading-[1.2]">
        {label}
      </span>
    </Link>
  );
}
