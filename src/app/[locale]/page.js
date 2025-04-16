import HowWeWorkSection from '@/components/sections/HowWeWork';
import Title from '@/components/Title';

export default function Home() {
  // throw Error('test error');

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Title tag={'h1'}>KiWiCode Solutions</Title>

      <HowWeWorkSection />
    </main>
  );
}
