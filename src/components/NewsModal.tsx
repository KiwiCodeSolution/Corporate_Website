'use client';

import Modal from '@/components/Modal';
import NewsPageComponent from '@/components/NewsPageComponent';
import allNews from '@/data/news.json';
import { useRouter } from '@/i18n/navigation';
import { useState } from 'react';

export default function NewsModal({ news }: { news: { slug: string } }) {
  const { slug } = news;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    router.push('/', { scroll: false });
    setIsOpen(false);
  };

  const currentNews = allNews.find((news) => news.slug === slug);

  // console.log('hi i am Intercepting NewsModalPage', currentNews);
  if (!currentNews) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} type="news">
      <NewsPageComponent slug={currentNews.slug} isSlots />
    </Modal>
  );
}
