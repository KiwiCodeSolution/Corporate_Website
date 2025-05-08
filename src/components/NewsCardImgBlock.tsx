import clsx from 'clsx';
import Image from 'next/image';

const NewsCardImgBlock = ({
  image,
  title,
  className = '',
}: {
  image: string;
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'w-full md:w-[340px] xl:w-[328px] h-[277px] p-[2px] rounded-base mb-6',
        className
      )}
      style={{
        background: 'linear-gradient(176.74deg, #5BD187 2.69%, #227D94 97.32%)',
      }}
    >
      <div className="w-full h-full rounded-[18px] overflow-hidden">
        <Image
          src={image || '/images/not-found.png'}
          alt={`Image for ${title}`}
          width={328}
          height={270}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default NewsCardImgBlock;
