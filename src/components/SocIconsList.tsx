'use client';

import { useState } from 'react';
import Insta from '@/assets/icons/insta.svg';
import InstaHover from '@/assets/icons/insta_hover.svg';
import Linkedin from '@/assets/icons/linkedin.svg';
import LinkedinHover from '@/assets/icons/linkedin_hover.svg';
import Telegram from '@/assets/icons/telegram.svg';
import TelegramHover from '@/assets/icons/telegram_hover.svg';

type ISocIcon = {
  id: string;
  link: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  IconHover: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
};

const SocIconsList = () => {
  const SOCIALICONSLIST: ISocIcon[] = [
    {
      id: 'a3NZb7b3R8Pz',
      link: 'https://www.instagram.com/',
      Icon: Insta,
      IconHover: InstaHover,
      label: 'instagram',
    },
    {
      id: 'g4Rts8Bv9NA2',
      link: 'https://web.telegram.org/',
      Icon: Telegram,
      IconHover: TelegramHover,
      label: 'telegram',
    },
    {
      id: '4dGGzg5G4K3s',
      link: 'https://ua.linkedin.com/',
      Icon: Linkedin,
      IconHover: LinkedinHover,
      label: 'linkedin',
    },
  ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-[138px] flex items-center justify-between gap-x-[30px]">
      {SOCIALICONSLIST.map(({ id, link, Icon, IconHover }) => (
        <a
          key={id}
          href={link}
          className="cursor-pointer"
          target="_blank"
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Icon
            className={`w-[26px] h-[26px] xl:w-8 xl:h-8 absolute transition-opacity duration-500`}
            width={40}
            height={40}
          />
          <IconHover
            className={`w-[26px] h-[26px] xl:w-8 xl:h-8 absolute transition-opacity duration-500 ${
              hoveredId === id ? 'opacity-100' : 'opacity-0'
            }`}
            width={40}
            height={40}
          />
        </a>
      ))}
    </div>
  );
};

export default SocIconsList;
