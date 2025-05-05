const NewsModalComponent = ({ news }: { news: object }) => {
  return (
    <div>
      <h1>Now you see Page {news.title}!</h1>
      <div className="p-4">
        <h2 className="text-2xl font-bold">{news.title}</h2>
        <p className="text-sm text-gray-600">{news.date}</p>
        <p className="mt-4">{news.description}</p>
      </div>
    </div>
  );
};

export default NewsModalComponent;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `News ${slug}`,
    description: `This is News ${slug} page`,
  };
}
