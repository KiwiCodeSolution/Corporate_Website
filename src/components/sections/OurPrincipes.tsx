'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { Link } from '@/i18n/navigation';
import allNews from '@/data/news.json';

const TestModal = ({ locale }: { locale: 'ua' | 'en' }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const randomId = Math.floor(Math.random() * 4) + 1;
  const currentNews = allNews.find((news) => news.id === randomId);
  return (
    <div className="w-[200px] h-[400px] bg-yellow-300 flex items-center justify-center">
      <h1 className="text-2xl font-bold">Test News Modal</h1>

      <Link
        className="w-full h-10 my-20 bg-amber-500"
        onClick={() => setIsOpenModal(true)}
        href={`/news/${currentNews.slug}`}
        locale={locale}
      >
        MODAL
      </Link>
    </div>
  );
};

export default TestModal;
