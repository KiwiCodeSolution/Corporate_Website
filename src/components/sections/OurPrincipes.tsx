'use client';

import { useState } from 'react';

import { Link } from '@/i18n/navigation';
import allNews from '@/data/news.json';
import BaseModal from '../ui/modal/BaseModal';

const TestModal = ({ locale }: { locale: 'ua' | 'en' }) => {
  const [openNewsId, setOpenNewsId] = useState<number | null | string>(null);

  return (
    <div className="grid grid-cols-4 gap-8 w-4/5 min-h-screen mx-auto items-center justify-center">
      {allNews.map((news) => (
        <div
          className="w-[200px] h-[400px] bg-yellow-300 flex flex-col items-center justify-center"
          key={news.id}
        >
          <h1 className="text-2xl font-bold">Test Link Modal</h1>

          <Link href={`/news/${news.slug}`} scroll={false} locale={locale}>
            MODAL
          </Link>
        </div>
      ))}
      {allNews.map((news) => (
        <div
          className="w-[200px] h-[400px] bg-yellow-300 flex flex-col items-center justify-center"
          key={news.id}
        >
          <h1 className="text-2xl font-bold">{news.title}</h1>

          <button className="w-full h-10 my-20 bg-amber-500" onClick={() => setOpenNewsId(news.id)}>
            MODAL
          </button>
          <BaseModal
            isOpen={openNewsId === news.id}
            onClose={() => setOpenNewsId(null)}
            key={news.id}
            type="baseModal"
          >
            <div className="p-4">
              <h2 className="text-2xl font-bold">{news.title}</h2>
              <p className="text-sm text-gray-600">{news.date}</p>
              <p className="mt-4">{news.description}</p>
            </div>
          </BaseModal>
        </div>
      ))}
    </div>
  );
};

export default TestModal;
