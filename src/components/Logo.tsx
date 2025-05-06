'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

const Logo = ({ locale }: { locale: 'ua' | 'en' }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Link href={'/'} locale={locale}>
      <Image
        src={resolvedTheme === 'dark' ? '/images/Logo_dark.svg' : '/images/Logo_light.svg'}
        alt="Logo компанії KiWiCode Solutions"
        width={132}
        height={54}
        priority
      />
    </Link>
  );
};

export default Logo;
