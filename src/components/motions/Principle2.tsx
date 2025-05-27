'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import { ANIMATION_DURATION_MS } from '@/configs/animationConfig';
import Img2 from '../../../public/images/principles/screen_3_girl.png';
import Img1 from '../../../public/images/principles/screen_3_img.png';
import '../../styles/principles.css';

const MotionPrinciple2 = () => {
  const bgControls = useAnimation();
  const girlControls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // Поява фону
      await bgControls.start({
        opacity: 1,
        transition: { delay: 0.3, duration: 0.5 },
      });

      // Поява дівчинки
      await girlControls.start({
        y: 0,
        opacity: 1,
        transition: { delay: 0.6, duration: 0.7, ease: 'easeOut' },
      });

      // Пауза перед зникненням
      await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION_MS / 2));

      // Зникнення фону
      bgControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });

      // Зникнення дівчинки
      girlControls.start({
        y: '100%',
        opacity: 0,
        transition: { duration: 0.5 },
      });
    }

    sequence();
  }, [bgControls, girlControls]);

  return (
    <div className="relative w-full h-full phone-content overflow-hidden">
      {/* Фонове зображення */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={bgControls}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-0 left-0 w-[713px] h-[649px]"
        style={{
          overflow: 'hidden',
          transform: 'translateX(-300px)',
        }}
      >
        <Image
          src={Img1}
          alt="background"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          width={713}
          height={649}
        />
      </motion.div>

      {/* Малюнок дівчинки */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={girlControls}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[440px] h-[528px]"
      >
        <Image src={Img2} alt="girl" width={440} height={528} />
      </motion.div>
    </div>
  );
};

export default MotionPrinciple2;
