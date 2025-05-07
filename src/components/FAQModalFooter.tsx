'use client';

import { JSX, useState } from 'react';
import BaseModal from './ui/modal/BaseModal';

interface FAQModalFooterProps {
  commonContent: JSX.Element;
}

const FAQModalFooter = ({ commonContent }: FAQModalFooterProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <button className="focus:outline-none" onClick={() => setIsOpenModal(true)}>
        {commonContent}
      </button>
      <BaseModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} type="baseModal">
        <h2>FAQModal</h2>
      </BaseModal>
    </>
  );
};

export default FAQModalFooter;
