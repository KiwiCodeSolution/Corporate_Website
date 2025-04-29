import Modal from '@/components/Modal';
import allNews from '@/data/news.json';

export default async function NewsPageBySlug({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const currentNews = allNews.find((news) => news.slug === slug);

  return (
    <Modal isOpen={true} type="news" mode="url">
      <h1>{currentNews.title}</h1>
      <p>{currentNews.description}</p>
    </Modal>
  );
}
