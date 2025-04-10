import HowWeWorkSection from '@/components/sections/HowWeWork';
import Title from '@/components/Title';

export default function Home() {
  // throw Error('test error');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Title tag={'h1'}>KiWiCode Solutions</Title>

        <HowWeWorkSection />
      </main>
    </div>
  );
}
