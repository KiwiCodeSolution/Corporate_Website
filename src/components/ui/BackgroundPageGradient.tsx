import '../../styles/bgGradients.css';

type Props = {
  page: 'home' | 'newsPage' | 'portfolioPage' | 'servicesPage';
  numberOfCircles?: number;
};

const BackgroundPageGradient = ({ page, numberOfCircles }: Props) => {
  const defaultCounts: Record<Props['page'], number> = {
    home: 5,
    newsPage: 4,
    portfolioPage: 3,
    servicesPage: 3,
  };

  const circleCount = numberOfCircles ?? defaultCounts[page];

  const gradients = [];

  for (let i = 0; i < circleCount; i++) {
    gradients.push(<div key={i} className={`gradient-${i + 1}`} />);
  }

  return (
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[1240px] min-h-screen pointer-events-none`}
    >
      {gradients}
    </div>
  );
};

export default BackgroundPageGradient;
