'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ANIMATION_DURATION_MS } from '@/configs/animationConfig';
import Img1 from '../../../public/images/principles/screen_1_img.png';
import Img2 from '../../../public/images/principles/screen_1_logo.png';
import '../../styles/principles.css';

const MotionPrinciple1 = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const textControls1 = useAnimation();
  const textControls2 = useAnimation();
  const imageControls = useAnimation();
  const logoControls = useAnimation();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    async function sequence() {
      // Поява елементів
      await textControls1.start({
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 80,
          damping: 15,
          duration: 0.6,
        },
      });

      await textControls2.start({
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 80,
          damping: 15,
          duration: 0.6,
        },
      });

      imageControls.start({
        opacity: 1,
        scale: 1,
        transition: { delay: 0.3, duration: 0.8, ease: 'easeOut' },
      });

      logoControls.start({
        y: 0,
        opacity: 1,
        transition: { delay: 1.5, duration: 0.7, ease: 'easeOut' },
      });

      // Чекаємо 3 секунди перед зникненням
      await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION_MS / 2));

      // Ховаємо елементи
      textControls1.start({
        x: '-100%',
        opacity: 0,
        transition: { duration: 0.5 },
      });

      textControls2.start({
        x: '100%',
        opacity: 0,
        transition: { duration: 0.5 },
      });

      imageControls.start({
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.5 },
      });

      logoControls.start({
        y: 40,
        opacity: 0,
        transition: { duration: 0.5 },
      });
    }

    sequence();
  }, [textControls1, textControls2, imageControls, logoControls, hasMounted]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center phone-content">
      <div className="relative w-full h-[62px] mb-8">
        {/* Текст 1 */}
        <motion.p
          initial={{ x: '-100%', opacity: 0 }}
          animate={textControls1}
          className="text-xl text-white uppercase font-normal absolute right-[100px] top-0"
        >
          New strategies
        </motion.p>

        {/* Текст 2 */}
        <motion.p
          initial={{ x: '100%', opacity: 0 }}
          animate={textControls2}
          className="text-xl text-white uppercase font-normal absolute right-[30px] top-10"
        >
          for your business
        </motion.p>
      </div>

      {/* Картинка */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={imageControls} className="mb-14">
        <Image src={Img1} alt="image of a hand holding a chess piece" width={298} height={276} />
      </motion.div>

      {/* Лого */}
      <motion.div initial={{ y: 40, opacity: 0 }} animate={logoControls}>
        <Image src={Img2} alt="Logo company KiwiCode Solutions" width={132} height={54} />
      </motion.div>
    </div>
  );
};

export default MotionPrinciple1;
