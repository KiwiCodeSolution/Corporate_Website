import { Link } from '@/i18n/navigation';
import Logo from './Logo';
import SocIconsList from './SocIconsList';

type IPoint = { id: string; label: string; link?: string; order?: string };

const MenuList = ({
  items,
  label,
  locale,
  style,
}: {
  items: IPoint[];
  label: string;
  locale: string;
  style: string;
}) => {
  return (
    <div className={`${style} flex flex-col gap-y-6`}>
      <h3 className="text-sm font-medium leading-[1.2] uppercase">{label}</h3>
      <div className="flex flex-col gap-y-3">
        {items.map((el) => (
          <Link href={el.link} locale={locale} key={el.label}>
            <div className="relative group w-fit">
              <p className="relative text-main after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-accent after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                {el.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const OurSpecialize = ({ items }: { items: IPoint[] }) => {
  return (
    <ul className="w-full flex flex-wrap gap-x-4 gap-y-3">
      {items.map((el) => (
        <li key={el.id} className={`card-wrapper-footer ${el.order}`}>
          <div className={`w-fit py-[2px] px-[19px] bg-bgColor text-main rounded-base`}>
            {el.label}
          </div>
        </li>
      ))}
    </ul>
  );
};

const Footer = ({ locale }: { locale: string }) => {
  const MENU: IPoint[] = [
    { id: '', label: 'About', link: '#about' },
    { id: '', label: 'Services', link: '/services' },
    { id: '', label: 'Portfolio', link: '/portfolio' },
    { id: '', label: 'News', link: '/news' },
  ];
  const USEFULLINKS: IPoint[] = [
    { id: '', label: 'Terms of Use Policy', link: '/terms' },
    { id: '', label: 'Privacy Policy', link: '/privacy' },
    { id: '', label: 'FAQ', link: '/faq' },
    { id: '', label: 'Integration', link: '/integration' },
  ];

  const SPECIALISELIST: IPoint[] = [
    { id: '3g26MCNn2uLu', label: 'UI/UX Design', order: 'order-1 xl:order-1' },
    { id: '5cpD852pnTSJ', label: 'Development', order: 'order-3 xl:order-2' },
    { id: 'e4bi8rA8RUK2', label: 'SMM', order: 'order-2 xl:order-3' },
    { id: 'Nd5Sf8G45Yic', label: 'Marketing', order: 'order-4 xl:order-4' },
    { id: 'g54SZMdh3U7u', label: 'Branding', order: 'order-5 xl:order-5' },
    { id: 'BU4rbhE68yF6', label: 'Optimization', order: 'order-6 xl:order-6' },
    { id: '5rVnTs92xH6T', label: 'Creative  Solutions', order: 'order-7 xl:order-7' },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FDFEFE] border-t border-accent rounded-t-[45px]">
      <div className="px-8 xl:w-full xl:px-[108px] pt-20 pb-[11px] xl:pb-8 flex flex-col gap-y-8">
        <div className="w-full border-b border-[rgba(144,157,162,0.3)] flex justify-between pb-8">
          <div className="w-[340px] xl:w-[408px] flex gap-x-6 xl:gap-x-8">
            <MenuList items={MENU} label="Menu" locale={locale} style={'w-[128px] xl:w-[192px]'} />
            <MenuList
              items={USEFULLINKS}
              label="Useful links"
              locale={locale}
              style={'w-[188px] xl:w-[192px]'}
            />
          </div>
          <div className="w-[340px] xl:w-[408px] flex flex-col gap-y-6">
            <h3 className="text-sm font-medium leading-[1.2] uppercase">We specialise in</h3>
            <OurSpecialize items={SPECIALISELIST} />
          </div>
        </div>
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
