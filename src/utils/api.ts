import { NewsItem } from '@/components/NewsCard';
import allNews from '@/data/news.json';
import allCases from '@/data/cases.json';
import { PortfolioItem } from '@/components/PortfolioCard';

export function getNews(slug: NewsItem['slug']) {
  return allNews.find((news) => news.slug === slug);
}

export function getCase(slug: PortfolioItem['slug']) {
  return allCases.find((portfolio) => portfolio.slug === slug);
}
