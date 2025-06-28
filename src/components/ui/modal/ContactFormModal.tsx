'use client';

import ContactForm from '@/components/forms/ContactForm';
import { Cross } from '@/assets/icons/icons';
import IconButton from '../buttons/IconButton';
import ModalOverlay from '../ModalOverlay';

export default function ContactFormModal({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) {
  return (
    isOpen && (
      <ModalOverlay onClose={onClose} closeByClickOnOverlay={false} closeByPressEsc={false}>
        <div className="relative flex justify-center w-[345px] md:w-[720px] xl:w-[976px] px-4 py-14 md:px-10 md:py-10 xl:px-7 xl:py-7 rounded-[20px] bg-bgColor">
          <IconButton
            icon={Cross}
            onClick={onClose}
            className="absolute top-4 md:top-8 right-4 md:right-8 w-[32px] h-[32px] md:w-[44px] md:h-[44px]"
          />
          <ContactForm onClose={onClose} />
        </div>
      </ModalOverlay>
    )
  );
}
