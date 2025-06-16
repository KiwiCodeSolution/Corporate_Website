import Image from 'next/image';
import InnovativeServicesPage from '../InnovativeServicesPage';

const HeroServicesPage = () => {
  return (
    <section className="w-full mb-[103px]">
      <div className="wrapper mx-auto">
        <div className="grid grid-cols-2 gap-x-10 mb-[95px]">
          <div className="w-full rounded-base overflow-hidden ">
            <Image
              src="/images/services/services_hero_1.jpg"
              alt=""
              width={492}
              height={532}
              className="w-full h-full rounded-base object-cover"
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-x-10">
            <div className="h-[532px] grid grid-rows-2 gap-y-10">
              <div className="h-full overflow-hidden">
                <Image
                  src="/images/services/services_hero_2.jpg"
                  alt=""
                  width={246}
                  height={246}
                  className="w-full h-full rounded-base object-cover"
                />
              </div>
              <div className="h-full overflow-hidden">
                <Image
                  src="/images/services/services_hero_3.jpg"
                  alt=""
                  width={246}
                  height={246}
                  className="w-full h-full rounded-base object-cover"
                />
              </div>
            </div>

            <div className="row-span-2 rounded-base overflow-hidden">
              <Image
                src="/images/services/services_hero_4.jpg"
                alt=""
                width={246}
                height={532}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <InnovativeServicesPage />
      </div>
    </section>
  );
};

export default HeroServicesPage;
