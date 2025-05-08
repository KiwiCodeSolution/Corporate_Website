'use client';

import { JSX, useState } from 'react';
import * as Icon from '@/assets/icons/icons';

type SocialIcon = {
  id: string;
  link: string;
  baseIcon: JSX.Element;
  hoverIcon: JSX.Element;
};

const socialIcons: SocialIcon[] = [
  {
    id: 'instagram',
    link: 'https://www.instagram.com/',
    baseIcon: <Icon.InstagramIcon className="w-full h-full" type="base" />,
    hoverIcon: <Icon.InstagramHoverIcon className="w-full h-full" />,
  },
  {
    id: 'telegram',
    link: 'https://web.telegram.org/',
    baseIcon: <Icon.TelegramIcon className="w-full h-full" type="base" />,
    hoverIcon: <Icon.TelegramHoverIcon className="w-full h-full" />,
  },
  {
    id: 'linkedin',
    link: 'https://ua.linkedin.com/',
    baseIcon: <Icon.LinkedinIcon className="w-full h-full" type="base" />,
    hoverIcon: <Icon.LinkedinHoverIcon className="w-full h-full" />,
  },
];

const SocIconsList = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-[176px] xl:w-[132px] flex items-center justify-between gap-x-4 xl:gap-x-[30px] order-2 md:order-3">
      {socialIcons.map(({ id, link, baseIcon, hoverIcon }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
          className="relative w-10 h-10 xl:w-6 xl:h-6 p-2 cursor-pointer"
        >
          <span className="absolute inset-0 transition-opacity duration-500">{baseIcon}</span>
          <span
            className={`absolute inset-0 transition-opacity duration-500 ${
              hoveredId === id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {hoverIcon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocIconsList;
