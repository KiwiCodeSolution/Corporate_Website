'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  function themaToggleHandler() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <label
      className="relative flex items-center px-[1px] h-[24px] w-[44px] rounded-full border-[1px] border-[var(--accent)] dark:border-0 bg-white cursor-pointer
    dark:bg-gradient-to-b dark:from-[#5BD187] dark:to-blue transition-colors duration-500 "
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={theme === 'dark'}
        onChange={themaToggleHandler}
      />
      <span className="absolute flex justify-center items-center size-[20px] bg-accent rounded-full transition-all duration-500 dark:bg-[#1f1f1f] dark:translate-x-[100%]">
        {theme === 'dark' ? (
          <Image src="/images/icons/dark.svg" alt="dark mode icon" width={16} height={16} />
        ) : (
          <Image src="/images/icons/light.svg" alt="light mode icon" width={16} height={16} />
        )}
      </span>
    </label>
  );
}
