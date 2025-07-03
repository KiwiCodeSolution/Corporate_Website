'use client';
import { useState } from 'react';
import { Arrow } from '@/assets/icons/icons';
import PillButton from './ui/buttons/PillButton';
import ContactFormModal from './ui/modal/ContactFormModal';

type componentProps = {
  text: string;
  btnText: string;
};

const InnovativeServicesOpenModalBnt = ({ text, btnText }: componentProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col w-[244px] xl:w-[318px] ">
        <p className="mb-8 xl:mt-[14.5px] font-medium leading-[1.4] text-dark dark:text-main-text">
          {text}
        </p>
        <PillButton
          variant="primary"
          size="l"
          className="w-full xl:min-w-[240px] xl:mx-auto z-[1] relative"
          onClick={() => setIsOpenModal(true)}
          icon={Arrow}
          iconProps={{ xl: true, s: false }}
        >
          {btnText}
        </PillButton>
      </div>
      <ContactFormModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

export default InnovativeServicesOpenModalBnt;
