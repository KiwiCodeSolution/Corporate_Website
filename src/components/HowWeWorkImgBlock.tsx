import Image from 'next/image';
import Title from './Title';
import { IPrinciple } from './sections/HowWeWork';

type HowWeWorkImgBlockProps = {
  items?: IPrinciple[];
  currentItem: number;
  theme: string;
  section?: 'swiper' | 'gallery';
  item?: IPrinciple;
};

const HowWeWorkImgBlock = ({
  items,
  currentItem,
  theme,
  section,
  item,
}: HowWeWorkImgBlockProps) => {
  const source = section === 'swiper' ? item : (item ?? items?.[currentItem]);

  return (
    <>
      <Image
        src={source.img}
        width={1000}
        height={1000}
        className="w-full h-full object-center object-cover absolute top-0 left-0 transition-opacity duration-2000 ease-in-out"
        alt=""
      />
      <div className="w-full h-full absolute top-0 left-0 hww-gallery-gradient z-[2]" />
      {source.component && currentItem === 0 && (
        <Image
          src={source.component}
          width={600}
          height={700}
          className="w-[400px] h-[402px] absolute top-[-10px] xl:top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-2000 ease-in-out"
          alt=""
        />
      )}
      {source.component && currentItem === 3 && (
        <Image
          src={source.component}
          width={326}
          height={307}
          className="absolute top-[-60px] right-[-138px] md:top-[-48px] md:right-[-38px] transition-opacity duration-2000 ease-in-out"
          alt=""
        />
      )}
      {source.component && (currentItem === 0 || currentItem === 3) && (
        <div className="w-full h-[55px] rounded-full absolute top-1/2 left-0 -translate-y-1/2 bg-[#68F2FF] blur-[166px] z-[4]" />
      )}
      <div
        className={`rounded-base p-6 relative z-[5] mt-auto transition-opacity duration-2000 ease-in-out ${theme === 'dark' ? 'bg-dark text-main-dark-grey' : 'bg-white text-dark'}`}
      >
        <Title styles={'xl:hidden font-semibold mb-2'}>{source.title}</Title>
        <p>{source.text}</p>
      </div>
    </>
  );
};

export default HowWeWorkImgBlock;
