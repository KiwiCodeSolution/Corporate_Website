import ServicesList from '../ServicesList';
import Title from '../Title';

const OurServicesSection = () => {
  return (
    <>
      <div className="w-[597px] h-[597px] pb-[30px] rounded-br-full bg-[linear-gradient(180deg,_#65B6F3_0%,_#7365F3_100%)] blur-[1000px] absolute left-[828px] z-0" />

      <section className="w-full h-fit relative">
        <div className="container w-[1064px] mx-auto min-h-[603px]">
          <div className="flex items-center justify-between">
            <Title tag={'h2'}>Our services</Title>
            <button>Learn more</button>
          </div>
          <ServicesList />
        </div>
      </section>
    </>
  );
};

export default OurServicesSection;
