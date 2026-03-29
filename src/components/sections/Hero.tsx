'use client';

import { useModal } from '@/app/context/ModalContext';
import PillButton from '../ui/buttons/PillButton';
import ContactFormModal from '../ui/modal/ContactFormModal';

export default function Hero() {
  const { modal, openModal, closeModal } = useModal();

  const isContactModalOpen = modal === 'contact';
  return (
    <div className="wrapper">
      <div className="h-[400px] flex justify-center items-center">
        <PillButton size="m" onClick={() => openModal('contact')}>
          {'Let is Work'}
        </PillButton>
        <ContactFormModal isOpen={isContactModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}
