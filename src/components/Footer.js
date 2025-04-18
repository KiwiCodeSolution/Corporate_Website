import { Link } from '@/i18n/navigation';

const Footer = ({ locale }) => {
  const MENU = [
    { id: '', label: 'About', link: '#about' },
    { id: '', label: 'Services', link: '/services' },
    { id: '', label: 'Portfolio', link: '/portfolio' },
    { id: '', label: 'News', link: '/news' },
  ];
  const LINKS = [
    { id: '', label: 'About', link: '#about' },
    { id: '', label: 'Services', link: '/services' },
    { id: '', label: 'Portfolio', link: '/portfolio' },
    { id: '', label: 'News', link: '/news' },
  ];
  return (
    <footer className="w-full ">
      <div className="xl:w-full xl:px-[108px] flex flex-col">
        <div className="w-full border-b border-lite-grey flex">
          <div className="w-[192px] flex flex-col gap-y-6 ml-6">
            <h3 className="text-sm font-medium leading-[1.2] uppercase">Menu</h3>
            <div className="flex flex-col gap-y-3">
              {MENU.map((el) => (
                <Link key={el.label} href={el.link} locale={locale}>
                  {el.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[192px] flex flex-col gap-y-6 ml-6">
            <h3 className="text-sm font-medium leading-[1.2] uppercase">Menu</h3>
            <div className="flex flex-col gap-y-3">
              {LINKS.map((el) => (
                <Link key={el.label} href={el.link} locale={locale}>
                  {el.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
