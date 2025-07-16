'use client';

import { JSX, useState } from 'react';
import * as Icon from '@/assets/icons/icons';

type SocialIcon = {
  id: string;
  link: string;
  baseIcon: JSX.Element;
  hoverIcon: JSX.Element;
};

const SocIconsList = ({ section }: { section?: string }) => {
  const type = section === 'footer' ? 'base' : '';

  const socialIcons: SocialIcon[] = [
    {
      id: 'instagram',
      link: 'https://www.instagram.com/',
      baseIcon: <Icon.InstagramIcon className="w-full h-full" type={type} />,
      hoverIcon: <Icon.InstagramHoverIcon className="w-full h-full" />,
    },
    {
      id: 'telegram',
      link: 'https://web.telegram.org/',
      baseIcon: <Icon.TelegramIcon className="w-full h-full" type={type} />,
      hoverIcon: <Icon.TelegramHoverIcon className="w-full h-full" />,
    },
    {
      id: 'linkedin',
      link: 'https://ua.linkedin.com/',
      baseIcon: <Icon.LinkedinIcon className="w-full h-full" type={type} />,
      hoverIcon: <Icon.LinkedinHoverIcon className="w-full h-full" />,
    },
  ];
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className={`${section === 'footer' ? 'w-[176px] xl:w-[132px] justify-between gap-x-4 xl:gap-x-[30px] order-2 md:order-3' : 'w-full justify-center gap-x-10'} flex items-center `}
    >
      {socialIcons.map(({ id, link, baseIcon, hoverIcon }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`relative ${section === 'footer' ? 'w-10 h-10 xl:w-6 xl:h-6' : 'w-10 h-10 xl:w-8 xl:h-8'} p-2 cursor-pointer`}
        >
          <span className="absolute inset-0 transition-opacity duration-500">{baseIcon}</span>
          {section === 'footer' && (
            <span
              className={`absolute inset-0 transition-opacity duration-500 ${
                hoveredId === id ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {hoverIcon}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

export default SocIconsList;
