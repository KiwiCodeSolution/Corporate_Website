import HowWeWorkGallery from '../HowWeWorkGallery';
import Title from '../Title';
// import { useTranslations } from 'next-intl';

const HowWeWorkSection = () => {
  // const t = useTranslations('HowWeWorks');
  const PRINCIPLES = [
    {
      id: '835sjHPnt6E',
      title: 'Research and Design',
      // title: t('principles.0.title'),
      // text: t('principles.0.text'),
      text: 'At KiWiCode Solutions, our journey begins with in-depth research and design. We conduct thorough market analysis and gather insights into your project`s goals and target audience. Our expert designers craft visually appealing and user-centric designs that set the foundation for a successful project.',
      img: '/images/how_we_work_1.png',
      component: '/images/how_we_work_1_component.png',
    },
    {
      id: 'e96fe2AG6Kb',
      title: 'Development',
      // title: t('principles.1.title'),
      // text: t('principles.1.text'),
      text: 'Once the design is approved, our skilled development team steps in. Using cutting-edge technologies, we transform designs into functional tech products. At KiWiCode Solutions, we specialize in creating custom solutions tailored to your specific needs, ensuring your project is unique and fully responsive.',
      img: '/images/how_we_work_2.jpg',
    },
    {
      id: 'v6k2Cj4b6VN',
      title: 'Testing and Optimization',
      // title: t('principles.2.title'),
      // text: t('principles.2.text'),
      text: 'Quality is our priority. In the testing and optimization phase, we perform extensive quality assurance to identify and resolve any issues, ensuring a seamless user experience. We also optimize performance, ensuring your project loads quickly and efficiently.',
      img: '/images/how_we_work_3.jpg',
    },
    {
      id: 'r5uhG9CLx25',
      title: 'Launching the Project',
      // title: t('principles.3.title'),
      // text: t('principles.3.text'),
      text: 'KiWiCode Solutions ensures a smooth and secure project launch. We handle the technical aspects of deployment, making your project accessible to your audience. This is the exciting moment when your project goes live and becomes available to users.',
      img: '/images/how_we_work_4.png',
      component: '/images/how_we_work_4_component.png',
    },
  ];
  return (
    <section className="w-full relative">
      <div className="w-full md:px-8 xl:px-0 xl:w-[1066px] mx-auto">
        <Title tag={'h2'}>How We Work</Title>
        <HowWeWorkGallery items={PRINCIPLES} />
      </div>
      <div className="absolute -left-[311px] top-[397px] w-[604px] h-[604px] rounded-full hww-section-gradient blur-[1000px] z-0" />
    </section>
  );
};

export default HowWeWorkSection;
