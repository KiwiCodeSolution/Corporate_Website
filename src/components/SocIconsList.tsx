'use client';
import Image from 'next/image';
import { useState } from 'react';

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
      img: '/images/icons/insta.svg',
      img_hover: '/images/icons/insta_hover.svg',
      label: 'instagram',
    },
    {
      id: 'g4Rts8Bv9NA2',
      link: 'https://web.telegram.org/',
      img: '/images/icons/telegram.svg',
      img_hover: '/images/icons/telegram_hover.svg',
      label: 'telegram',
    },
    {
      id: '4dGGzg5G4K3s',
      link: 'https://ua.linkedin.com/',
      img: '/images/icons/linkedin.svg',
      img_hover: '/images/icons/linkedin_hover.svg',
      label: 'linkedin',
    },
  ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-[138px] flex items-center justify-between gap-x-[30px]">
      {SOCIALICONSLIST.map((el) => (
        <a
          key={el.id}
          href={el.link}
          className="cursor-pointer"
          target="_blank"
          onMouseEnter={() => setHoveredId(el.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Image
            src={hoveredId === el.id && el.img_hover ? el.img_hover : el.img}
            width={40}
            height={40}
            alt={`social network icon image ${el.label}`}
            className="w-[26px] h-[26px] xl:w-8 xl:h-8"
          />
        </a>
      ))}
    </div>
  );
};

export default SocIconsList;
