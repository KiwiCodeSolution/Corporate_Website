'use client';
import { useState } from 'react';
import PillButton from './ui/buttons/PillButton';
import BaseModal from './ui/modal/BaseModal';

type componentProps = {
  text: string;
  btnText: string;
};

const InnovativeServicesOpenModalBnt = ({ text, btnText }: componentProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col">
        <p className="w-[318px] mb-8 mt-[14.5px] leading-[1.4] text-dark dark:text-main-text">
          {text}
        </p>
        <PillButton
          variant="primary"
          size="l"
          className="w-[240px] mx-auto z-[1] relative"
          onClick={() => setIsOpenModal(true)}
        >
          {btnText}
        </PillButton>
      </div>
      <BaseModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} type="baseModal">
        <h1>It is modal in Service Page! </h1>
      </BaseModal>
    </>
  );
};

export default InnovativeServicesOpenModalBnt;
