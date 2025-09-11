'use client';

import { useEffect, useState } from 'react';
import { AgilePoint } from '@/assets/icons/AgilePoint';

const ProcessSteps = () => {
  const STEPS = ['Plan', 'Design', 'Develop', 'Test', 'Deploy', 'Review', 'Launch'];

  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [STEPS.length]);

  return (
    <ul className="w-[156px] h-[411px] xl:h-[488px] flex flex-col items-center justify-between gap-y-[2px] xl:gap-y-[3.5px] absolute top-[28px] left-[115px] z-[7] py-2">
      {STEPS.map((step, index) => {
        const isActive = currentStep === index;

        return (
          <li
            key={step}
            className="flex flex-col items-center gap-y-[2px] xl:gap-y-[3.5px] transition-all duration-500 ease-in-out "
          >
            <p
              className={`text-base xl:text-lg leading-[1.4] font-semibold tracking-[-2%] transition-colors duration-500 ease-in-out ${
                isActive ? 'text-main-title' : 'text-grey dark:text-main-text dark:opacity-35'
              }`}
            >
              {step}
            </p>

            {index !== STEPS.length - 1 && <AgilePoint isActive={isActive} />}
          </li>
        );
      })}
    </ul>
  );
};

export default ProcessSteps;
