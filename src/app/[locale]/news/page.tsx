import Title from '@/components/Title';
import { Link } from '@/i18n/navigation';

export default function News() {
  return (
    <main className="w-full min-h-screen items-center justify-center bg-bgColor relative">
      <Link href="/" className="text-accent text-xl font-extrabold absolute top-2 left-2">
        Go to Home
      </Link>
      <section className="w-full py-10">
        <div className="wrapper mx-auto">
          <Title tag={'h2'} styles="mb-10">
            News Page
          </Title>
        </div>
      </section>
    </main>
  );
}
