import Image from 'next/image';

const OurProcess = () => {
  return (
    <section className="w-full min-h-[544px] my-[104px] our-process-section">
      <div className="wrapper mx-auto flex">
        <div className="w-[400px] mr-2.5 relative overflow-hidden">
          <Image
            src={'/images/services/background-1st-part.png'}
            width={400}
            height={544}
            className=""
            alt=""
          />
          <Image
            src={'/images/services/girl.png'}
            width={400}
            height={544}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1]"
            alt=""
          />
        </div>
        <div className="w-[348px] mr-[50px]">
          <Image
            src={'/images/services/background-2st-part.png'}
            width={348}
            height={544}
            className=""
            alt=""
          />
        </div>
        <div className="w-[256px] flex flex-col justify-between gap-y-4">
          <div className="w-full h-[448px]">
            <Image
              src={'/images/services/background-3st-part.png'}
              width={256}
              height={448}
              className=""
              alt=""
            />
          </div>
          <div className="w-full h-20">
            <Image
              src={'/images/services/background-4st-part.png'}
              width={256}
              height={80}
              className=""
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
