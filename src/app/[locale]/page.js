import { useTranslations } from 'next-intl';

import Title from '@/components/Title';
import LocaleToggle from '@/components/LocaleToggle';

export default function Home() {
  // throw Error('test error');

  const t = useTranslations('Home');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Title tag={'h1'}>{t('title')}</Title>
        <LocaleToggle />
      </main>
    </div>
  );
}
