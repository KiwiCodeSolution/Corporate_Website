'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ArrowAnimated = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <svg
      width="197"
      height="516"
      viewBox="0 0 197 516"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      className="mx-auto"
    >
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="9"
          y1="152.762"
          x2="-3.95652"
          y2="348.757"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#227D94" />
          <stop offset="0.5" stopColor="#2DB689" />
          <stop offset="1" stopColor="#13A397" />
        </linearGradient>
      </defs>

      <motion.path
        d="M1 170.207C1 174.625 4.58172 178.207 9 178.207C13.4183 178.207 17 174.625 17 170.207C17 165.789 13.4183 162.207 9 162.207C4.58172 162.207 1 165.789 1 170.207ZM9 338.502L0.339746 353.502H17.6603L9 338.502Z
        M29 2V3.5H175V2V0.5H29V2ZM195 22H193.5V494H195H196.5V22H195Z
        ..." // ← Вставляй увесь path сюди
        stroke="url(#paint0_linear)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        initial={false}
        animate={
          isInView
            ? {
                strokeDashoffset: 0,
              }
            : {}
        }
        transition={{
          duration: 3,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
};

export default ArrowAnimated;
