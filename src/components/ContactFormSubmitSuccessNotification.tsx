'use client';

import { useTranslations } from 'next-intl';

import { Cross } from '@/assets/icons/icons';
import ModalOverlay from './ui/ModalOverlay';
import IconButton from './ui/buttons/IconButton';

export default function ContactFormSubmitSuccessNotification({
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('notifications');

  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative flex items-center p-[24px] w-[345px] h-[300px] md:w-[720px] md:h-[300px] xl:w-[704px] xl:h-[300px] bg-bgColor rounded-[20px]">
        <IconButton
          icon={Cross}
          className="absolute w-[32px] h-[32px] md:w-[44px] md:h-[44px] top-[22px] right-[22px] md:top-8 md:right-8"
          onClick={onClose}
        />
        <div className="w-full flex flex-col items-center gap-y-6">
          <p className="text-[32px] md:text-[40px] leading-[1.2] md:leading-[1.4] font-semibold text-center">
            {t('success.title')}
          </p>
          <p className="text-[20px] leading-[1.4] font-medium text-center">
            {t('success.message')}
          </p>
        </div>
      </div>
    </ModalOverlay>
  );
}
