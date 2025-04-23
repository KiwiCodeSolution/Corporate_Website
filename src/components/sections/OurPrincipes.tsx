'use client';

import { useEffect, useState } from 'react';
import DarkModeIcon from '../../assets/icons/dark.svg';

import Image from 'next/image';

const TestPrinciples = () => {
  const [mounted, setMounted] = useState(false);

  console.log('start');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log(DarkModeIcon);

  return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <DarkModeIcon />
      {/* <Image src={DarkModeIcon} width={20} height={20} /> */}
    </div>
  );
};

export default TestPrinciples;
