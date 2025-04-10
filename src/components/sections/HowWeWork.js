import HowWeWorkGallery from '../HowWeWorkGallery';
import Title from '../Title';

const HowWeWorkSection = () => {
  return (
    <section className="w-full relative">
      <div className="w-[1066px] mx-auto ">
        <Title tag={'h2'}>How We Work</Title>
        <HowWeWorkGallery />
      </div>
      <div className="absolute -left-[311px] top-[397px] w-[604px] h-[604px] rounded-full hww-section-gradient blur-[1000px] z-0" />
    </section>
  );
};

export default HowWeWorkSection;
