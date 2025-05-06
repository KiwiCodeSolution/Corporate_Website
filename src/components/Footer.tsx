'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import SocIconsList from './SocIconsList';
import OurSpecialize from './OurSpecialize';
import UsefulLinks from './UsefulLinks';

export type IPoint = { id: string; label: string; link?: string; order?: string };

export const TitleFooter = ({ text }) => {
  return <h3 className="text-sm font-medium leading-[1.2] uppercase opacity-65">{text}</h3>;
};

const Footer = ({ locale }: { locale: 'ua' | 'en' }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const year = new Date().getFullYear();

  return (
    <footer
      className={`w-full ${theme === 'dark' ? 'bg-bgColor' : 'bg-[#FDFEFE]'} border-t border-accent rounded-t-[45px]`}
    >
      <div className="wrapper pt-12 xl:pt-20 pb-[11px] xl:pb-8 flex flex-col gap-y-8 mx-auto">
        <div className="w-full border-b border-[rgba(144,157,162,0.3)] flex flex-col md:flex-row justify-between pb-8">
          {/* розділ із лінками та сторінками */}
          <div className="w-full md:w-[340px] xl:w-[408px] flex gap-x-2 md:gap-x-6 xl:gap-x-8">
            <div className="w-[160px]">
              <TitleFooter text="Menu" />
            </div>

            <UsefulLinks locale={locale} />
          </div>

          {/* блок сервісів */}
          <OurSpecialize />
        </div>

        {/* блок із логотипом та соцмережами */}
        <div className="w-full h-14 flex items-center justify-between">
          <Logo locale={locale} />
          <div>
            <p className="text-[#8D8D8D] text-base leading-[1.35]">
              ©<span>{year}</span>, All right reserved
            </p>
          </div>

          <SocIconsList />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
