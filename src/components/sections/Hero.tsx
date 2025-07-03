'use client';

import { useState } from 'react';
import PillButton from '../ui/buttons/PillButton';
import ContactFormModal from '../ui/modal/ContactFormModal';

export default function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  return (
    <div className="wrapper">
      <div className="h-[400px] flex justify-center items-center">
        <PillButton size="m" onClick={() => setIsContactModalOpen(true)}>
          {'Let is Work'}
        </PillButton>
        <ContactFormModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
    </div>
  );
}
