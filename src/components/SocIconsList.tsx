'use client';

import { useState } from 'react';
import InstaHover from '@/assets/icons/insta_hover.svg';
import Telegram from '@/assets/icons/telegram.svg';
import TelegramHover from '@/assets/icons/telegram_hover.svg';
import Linkedin from '@/assets/icons/linkedin.svg';
import LinkedinHover from '@/assets/icons/linkedin_hover.svg';
import Insta from '@/assets/icons/insta.svg';
import Image from 'next/image';

type ISocIcon = {
  id: string;
  link: string;
  img: string;
  img_hover?: string;
  label: string;
};

const SocIconsList = () => {
  const SOCIALICONSLIST: ISocIcon[] = [
    {
      id: 'a3NZb7b3R8Pz',
      link: 'https://www.instagram.com/',
      img: Insta,
      img_hover: InstaHover,
      label: 'instagram',
    },
    {
      id: 'g4Rts8Bv9NA2',
      link: 'https://web.telegram.org/',
      img: Telegram,
      img_hover: TelegramHover,
      label: 'telegram',
    },
    {
      id: '4dGGzg5G4K3s',
      link: 'https://ua.linkedin.com/',
      img: Linkedin,
      img_hover: LinkedinHover,
      label: 'linkedin',
    },
  ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-[138px] flex items-center justify-between gap-x-[30px]">
      {SOCIALICONSLIST.map(({ id, link, img, img_hover, label }) => (
        <a
          key={id}
          href={link}
          className="cursor-pointer"
          target="_blank"
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Image
            src={img}
            width={40}
            height={40}
            alt={`social network icon image ${label}`}
            className={`w-[26px] h-[26px] xl:w-8 xl:h-8 absolute transition-opacity duration-500`}
          />
          <Image
            src={img_hover || img}
            width={40}
            height={40}
            alt={`social network icon hover image ${label}`}
            className={`w-[26px] h-[26px] xl:w-8 xl:h-8 absolute transition-opacity duration-500 ${
              hoveredId === id ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </a>
      ))}
    </div>
  );
};

export default SocIconsList;
