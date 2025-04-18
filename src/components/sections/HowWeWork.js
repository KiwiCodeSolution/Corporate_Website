import { useTranslations } from 'next-intl';
import HowWeWorkGallery from '../HowWeWorkGallery';
import Title from '../Title';

const HowWeWorkSection = () => {
  const t = useTranslations('HowWeWorks');
  const PRINCIPLES = [
    {
      id: '835sjHPnt6E',
      title: t('principles.0.title'),
      text: t('principles.0.text'),
      img: '/images/how_we_work_1.png',
      component: '/images/how_we_work_1_component.png',
    },
    {
      id: 'e96fe2AG6Kb',
      title: t('principles.1.title'),
      text: t('principles.1.text'),
      img: '/images/how_we_work_2.jpg',
    },
    {
      id: 'v6k2Cj4b6VN',
      title: t('principles.2.title'),
      text: t('principles.2.text'),
      img: '/images/how_we_work_3.jpg',
    },
    {
      id: 'r5uhG9CLx25',
      title: t('principles.3.title'),
      text: t('principles.3.text'),
      img: '/images/how_we_work_4.png',
      component: '/images/how_we_work_4_component.png',
    },
  ];
  return (
    <section className="w-full min-h-[700px] relative hww">
      <div className="w-full px-[15px] md:px-8 xl:px-0 xl:w-[1066px] mx-auto">
        <Title tag={'h2'}>{t('title')}</Title>
        <HowWeWorkGallery items={PRINCIPLES} />
      </div>
      {/* <div className="absolute -left-[311px] top-[397px] w-[604px] h-[604px] rounded-full hww-section-gradient blur-[1000px] z-0" /> */}
    </section>
  );
};

export default HowWeWorkSection;
