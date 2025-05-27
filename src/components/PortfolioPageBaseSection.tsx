'use client';

import { useState } from 'react';
import PortfolioCasePreview from '@/components/PortfolioCasePreview';
import Title from '@/components/Title';
import allCases from '@/data/cases.json';
import { PortfolioType } from './PortfolioCard';
import LoadMoreButton from './ui/buttons/LoadMoreButton';

const allowedTypes: PortfolioType[] = [
  'UI/UX Design',
  'Development',
  'SMM',
  'Marketing',
  'Branding',
  'Optimisation',
  'Creative Solutions',
];
const PortfolioPageBaseSection = ({ locale }: { locale: 'ua' | 'en' }) => {
  const castedCases = allCases.map((el) => ({
    ...el,
    type: Array.isArray(el.type)
      ? el.type.filter((t: string): t is PortfolioType => allowedTypes.includes(t as PortfolioType))
      : allowedTypes.includes(el.type as PortfolioType)
        ? [el.type as PortfolioType]
        : [],
  }));

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = castedCases.slice(0, currentPage * ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <section className="wrapper mx-auto pt-[104px] pb-[83px]">
      <Title tag="h1" styles="mb-12">
        Portfolio
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-[64px] min-h-[calc(100vh-104px)]">
        {visibleItems.map((el, index) => (
          <PortfolioCasePreview key={el.id} item={el} locale={locale} index={index} />
        ))}
      </div>
      {visibleItems.length < allCases.length && (
        <LoadMoreButton onClick={handleLoadMore} className="mx-auto block w-max " />
      )}
    </section>
  );
};

export default PortfolioPageBaseSection;
