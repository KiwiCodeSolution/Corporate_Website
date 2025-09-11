'use client';

import { useId } from 'react';
import { useTheme } from 'next-themes';

export const AgilePoint = ({ isActive }: { isActive: boolean }) => {
  const gradientId = useId();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const fillCircle = isDark
    ? isActive
      ? 'white'
      : 'rgba(255, 255, 255, 0.35)'
    : isActive
      ? '#248792'
      : '#CBCBCB';

  const stopColor = isDark
    ? isActive
      ? 'white'
      : 'rgba(255, 255, 255, 0.35)'
    : isActive
      ? '#248792'
      : '#D1D1D1';

  return (
    <svg
      width="6"
      viewBox="0 0 6 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 xl:h-[42px]"
    >
      <line
        x1="2.97001"
        y1="36.803"
        x2="2.97001"
        y2="4.53179"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.852941"
        style={{ transition: 'stroke 0.5s ease-in-out' }}
      />
      <circle
        cx="2.99988"
        cy="2.89343"
        r="2.37293"
        fill={fillCircle}
        style={{ transition: 'fill 0.5s ease-in-out' }}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="3.39648"
          y1="4.53179"
          x2="3.39648"
          y2="36.803"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor={stopColor}
            style={{ transition: 'stop-color 0.5s ease-in-out' }}
          />
          <stop offset="1" stopColor="#C7C7C7" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
