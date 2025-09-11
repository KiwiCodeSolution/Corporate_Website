'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InnovativeServicesPage from '../InnovativeServicesPage';

const HeroServicesPage = () => {
  const [showInnovativeImage, setShowInnovativeImage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowInnovativeImage(true);
    }, 1300); // остання анімація закінчується через 1.3с

    return () => clearTimeout(timeout);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section className="w-full mb-[72px] xl:mb-[103px]">
      <div className="wrapper mx-auto">
        <div className="grid grid-cols-2 gap-x-6 xl:gap-x-10 mb-[95px]">
          {/* Велике зображення зліва */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="w-full rounded-base overflow-hidden group"
          >
            <Image
              src="/images/services/services_hero_1.jpg"
              alt=""
              width={492}
              height={532}
              className="w-full h-full rounded-base object-cover group-hover:scale-110 transition duration-500 ease-in-out"
              priority
            />
          </motion.div>

          {/* Правий блок */}
          <div className="w-full grid grid-cols-2 gap-x-6 xl:gap-x-10">
            <div className="h-[352px] xl:h-[532px] grid grid-rows-2 gap-y-6 xl:gap-y-10">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="h-full rounded-base overflow-hidden group"
              >
                <Image
                  src="/images/services/services_hero_2.jpg"
                  alt=""
                  width={246}
                  height={246}
                  className="w-full h-full rounded-base object-cover group-hover:scale-110 transition duration-500 ease-in-out relative z-[5]"
                  priority
                />
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full rounded-base overflow-hidden group"
              >
                <Image
                  src="/images/services/services_hero_3.jpg"
                  alt=""
                  width={246}
                  height={246}
                  className="w-full h-full rounded-base object-cover group-hover:scale-110 transition duration-500 ease-in-out relative z-[5]"
                  priority
                />
              </motion.div>
            </div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="row-span-2 rounded-base overflow-hidden group"
            >
              <Image
                src="/images/services/services_hero_4.jpg"
                alt=""
                width={246}
                height={532}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-in-out"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Передаємо флаг у наступний компонент */}
        <InnovativeServicesPage showImage={showInnovativeImage} />
      </div>
    </section>
  );
};

export default HeroServicesPage;
