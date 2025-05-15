'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ANIMATION_DURATION_MS } from '@/configs/animationConfig';
import Img1 from '../../../public/images/principles/screen_2_lamp.png';

const EXIT_ANIMATION_MS = 700;

const MotionPrinciple3 = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const visibleDuration = ANIMATION_DURATION_MS - EXIT_ANIMATION_MS;

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, visibleDuration);

    return () => clearTimeout(hideTimeout);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center phone-content">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: EXIT_ANIMATION_MS / 1000, ease: 'easeOut' }} // тут перевели мілісекунди в секунди
          >
            <Image src={Img1} alt="lamp" width={340} height={455} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotionPrinciple3;
