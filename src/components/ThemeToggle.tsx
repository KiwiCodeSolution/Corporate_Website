'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { DarkTheme, LitghtTheme } from '@/assets/icons/icons';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  function themaToggleHandler() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // return (
  //   <label
  //     className="group relative flex items-center px-[1px] h-[24px] w-[44px] rounded-full dark:border-0 bg-accent cursor-pointer
  //     outline-[2px] outline-offset-[2px] outline-transparent focus-within:outline-blue hover:shadow-base
  //     dark:bg-gradient-to-b dark:from-[#5BD187] dark:to-blue base-transition "
  //   >
  //     <input
  //       type="checkbox"
  //       className="sr-only"
  //       checked={theme === 'dark'}
  //       onChange={themaToggleHandler}
  //       onClick={(e) => e.currentTarget.blur()}
  //     />
  //     <DarkModeIcon
  //       alt="dark mode icon"
  //       className="absolute right-[4px]  rounded-full fill-white size-[16px] group-hover:fill-[#F4D64F] base-transition"
  //     />
  //     <LightModeIcon
  //       alt="light mode icon"
  //       className="absolute left-[4px]  rounded-full fill-white size-[16px] group-hover:fill-[#F4D64F] base-transition"
  //     />
  //     <span className="absolute left-[2px] flex justify-center items-center size-[20px] bg-white rounded-full  dark:bg-[#1f1f1f] dark:translate-x-[100%] base-transition"></span>
  //   </label>
  // );

  return (
    <label
      className="block group relative px-[1px] h-[24px] w-[44px] rounded-full shadow-[inset_0_0_0_1px_var(--accent)] bg-white cursor-pointer
      outline-[2px] outline-offset-[2px] outline-transparent focus-within:outline-blue
      hover:shadow-[inset_0_0_0_1px_var(--accent),0_0_14px_0_var(--accent)]
      dark:shadow-none dark:bg-gradient-to-b dark:from-[#5BD187] dark:to-blue  base-transition
      dark:hover:shadow-[0_0_14px_0_var(--accent)]"
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={theme === 'dark'}
        onChange={themaToggleHandler}
        onClick={(e) => e.currentTarget.blur()}
      />
      <span
        className="absolute left-[2px] top-[2px] flex justify-center items-center size-[20px] bg-accent rounded-full
        dark:bg-[#1f1f1f] dark:translate-x-[100%] base-transition"
      >
        {theme === 'dark' ? (
          <DarkTheme className="size-[16px] fill-white group-hover:fill-[#F4D64F] base-transition" />
        ) : (
          <LitghtTheme className="size-[16px] fill-white group-hover:fill-[#F4D64F] base-transition" />
        )}
      </span>
    </label>
  );
}
