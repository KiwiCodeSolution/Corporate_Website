'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Img1 from '../../../public/images/principles/screen_4_hands.png';
import Img2 from '../../../public/images/principles/screen_4_wave.png';
import '../../styles/principles.css';

const MotionPrinciple4 = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center phone-content">
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-white text-center mb-4"
      >
        Screen 4
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Image src={Img1} alt="1" width={100} height={100} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Image src={Img2} alt="2" width={80} height={80} />
      </motion.div>
    </div>
  );
};

export default MotionPrinciple4;
