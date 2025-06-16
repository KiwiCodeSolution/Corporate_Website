'use client';

import { useState } from 'react';
import { RunningLineIcon } from '@/assets/icons/icons';
import PillButton from './ui/buttons/PillButton';
import BaseModal from './ui/modal/BaseModal';

const RunningLine = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const messages = [
    'Let’s build something great.',
    'Big ideas? We’re all ears.',
    'We help businesses thrive.',
  ];

  const repeatedItems = [...messages, ...messages];
  return (
    <>
      <div className="running-line-wrapper h-[118px] w-full overflow-hidden bg-[#F5F5F5] dark:bg-bgColor py-6 my-20">
        <div className="relative">
          <div className="running-line flex w-max animate-running-line gap-8">
            {repeatedItems.map((text, idx) => (
              <div
                key={idx}
                className="h-[70px] flex items-center gap-4 whitespace-nowrap shrink-0"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <RunningLineIcon />
                </div>

                <span className="text-[56px] text-dark dark:text-main-text">{text}</span>
                <PillButton
                  variant="primary"
                  size="l"
                  className="w-[240px] mx-auto z-[1] relative"
                  onClick={() => setIsOpenModal(true)}
                >
                  Get in touch
                </PillButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BaseModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} type="baseModal">
        <h1>It is modal in Running line ! </h1>
      </BaseModal>
    </>
  );
};

export default RunningLine;
