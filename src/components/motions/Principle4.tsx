'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ANIMATION_DURATION_MS } from '@/configs/animationConfig';
import Img1 from '../../../public/images/principles/screen_4_hands.png';
import Img2 from '../../../public/images/principles/screen_4_wave.png';
import '../../styles/principles.css';

const MotionPrinciple4 = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, ANIMATION_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center phone-content">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -14 }}
        animate={
          isVisible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: -14 }
        }
        transition={{
          opacity: {
            delay: isVisible ? 0.3 : 0,
            duration: 0.5,
          },
          scale: {
            delay: isVisible ? 0.3 : 0,
            duration: 0.5,
          },
          rotate: {
            delay: isVisible ? 2.3 : 0,
            duration: 0.5,
          },
        }}
        className="w-[333px] h-[333px] absolute top-[149px] left-1/2 -translate-x-1/2 z-[5] flex items-center justify-center"
      >
        <div className="w-[333px] h-[333px] relative z-[1]">
          <div className="absolute inset-0 top-0 left-0 blur-circle z-[1] flex items-center justify-center">
            <div className="w-[333px] h-[333px] rounded-full bg-[#0D4A56]" />
          </div>

          <Image
            src={Img1}
            alt="hands"
            width={300}
            height={182}
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[340px] h-[182px] z-[3]"
          />
        </div>
      </motion.div>

      {/* Хвиля */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[644px] h-[221px] z-[3] rotate-[-16deg]"
      >
        <Image src={Img2} alt="wave" width={644} height={221} />
      </motion.div>
    </div>
  );
};

export default MotionPrinciple4;
