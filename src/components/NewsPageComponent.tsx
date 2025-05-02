const NewsPageComponent = ({ slug, isSlots }) => {
  return (
    <h1>
      Now you see Page {slug}! {isSlots && <p> isSlots</p>}
    </h1>
  );
};

export default NewsPageComponent;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `News ${slug}`,
    description: `This is News ${slug} page`,
  };
}
