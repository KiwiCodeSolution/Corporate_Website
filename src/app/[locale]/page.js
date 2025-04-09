import OurServicesSection from '@/components/sections/OurServices';
import Title from '@/components/Title';

export default function Home() {
  // throw Error('test error');

  return (
    <div className="w-screen h-full overflow-x-hidden">
      <main className="relative ">
        <Title tag={'h1'} styles={'text-center my-[50px]'}>
          KiWiCode Solutions
        </Title>
        <OurServicesSection />
      </main>
    </div>
  );
}
