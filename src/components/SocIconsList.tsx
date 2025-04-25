'use client';

import { JSX, useState } from 'react';
import * as Icons from '@/assets/icons/icons';
import Image from 'next/image';
import Insta from '@/assets/icons/insta.svg';
import InstaHover from '@/assets/icons/insta_hover.svg';
import Linkedin from '@/assets/icons/linkedin.svg';
import LinkedinHover from '@/assets/icons/linkedin_hover.svg';
import Telegram from '@/assets/icons/telegram.svg';
import TelegramHover from '@/assets/icons/telegram_hover.svg';

type ISocIcon = {
  id: string;
  link: string;
  Icon: (props: { isHovered: boolean }) => JSX.Element;
  label: string;
};

const SocIconsList = () => {
  const SOCIALICONSLIST: ISocIcon[] = [
    {
      id: 'a3NZb7b3R8Pz',
      link: 'https://www.instagram.com/',
      Icon: ({ isHovered }) =>
        isHovered ? (
          <Icons.InstagramHoverIcon className={iconClass} />
        ) : (
          <Icons.InstagramIcon type="base" className={iconClass} />
        ),
      label: 'instagram',
    },
    {
      id: 'g4Rts8Bv9NA2',
      link: 'https://web.telegram.org/',
      Icon: ({ isHovered }) =>
        isHovered ? (
          <Icons.TelegramHoverIcon className={iconClass} />
        ) : (
          <Icons.TelegramIcon type="base" className={iconClass} />
        ),
      label: 'telegram',
    },
    {
      id: '4dGGzg5G4K3s',
      link: 'https://ua.linkedin.com/',
      Icon: ({ isHovered }) =>
        isHovered ? (
          <Icons.LinkedinHoverIcon className={iconClass} />
        ) : (
          <Icons.LinkedinIcon type="base" className={iconClass} />
        ),
      label: 'linkedin',
    },
  ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const iconClass = 'w-[26px] h-[26px] xl:w-8 xl:h-8 transition-opacity duration-500';



    return (
      <div className="w-[138px] flex items-center justify-between gap-x-[30px]">
        {SOCIALICONSLIST.map(({ id, link, Icon }) => (
          <a
            key={id}
            href={link}
            className="relative cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Icon isHovered={hoveredId === id} />
          </a>
        ))}
      </div>
    );
  };
};

export default SocIconsList;
