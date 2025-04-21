'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Image
      src={resolvedTheme === 'dark' ? '/images/Logo_dark.svg' : '/images/Logo_light.svg'}
      alt="Logo компанії KiWiCode Solutions"
      width={132}
      height={54}
      priority
    />
  );
};

export default Logo;
