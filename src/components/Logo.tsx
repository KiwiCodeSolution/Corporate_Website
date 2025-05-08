'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

const Logo = ({
  locale,
  className,
  section,
}: {
  locale: 'ua' | 'en';
  className: string;
  section?: string;
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Link href={'/'} locale={locale} className={`${className}`}>
      <Image
        src={resolvedTheme === 'dark' ? '/images/Logo_dark.svg' : '/images/Logo_light.svg'}
        alt="Logo компанії KiWiCode Solutions"
        width={132}
        height={54}
        priority
        className={`${section === 'header' ? 'w-[117px] h-[48px] xl:w-[132px] xl:h-[54px]' : 'w-[132px] h-[54px]'} `}
      />
    </Link>
  );
};

export default Logo;
