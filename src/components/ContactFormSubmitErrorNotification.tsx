'use client';

import { useTranslations } from 'next-intl';

import { Cross } from '@/assets/icons/icons';
import IconButton from './ui/buttons/IconButton';
import PillButton from './ui/buttons/PillButton';
import ModalOverlay from './ui/ModalOverlay';

export default function ContactFormSubmitErrorNotification({
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('notifications');
  const t2 = useTranslations('buttons');

  return (
    <ModalOverlay onClose={onClose} closeByClickOnOverlay={false}>
      <div className="relative flex justify-center items-center px-6 py-8 w-[345px] md:w-[720px] xl:w-[704px] bg-bgColor rounded-[20px]">
        <IconButton
          size="s"
          icon={Cross}
          className="absolute w-[32px] h-[32px] md:w-[44px] md:h-[44px] top-[22px] right-[22px] md:top-[32px] md:right-[32px]"
          onClick={onClose}
        />
        <div className="flex flex-col">
          <p className="text-[40px] leading-[1.4] font-semibold text-center">{t('error.title')}</p>
          <p className="mt-6 text-[20px] leading-[1.4] font-medium whitespace-pre-line text-center">
            {t('error.message')}
          </p>
          <PillButton size="m" variant="secondary" className="mt-8 md:mx-auto" onClick={onClose}>
            {t2('goBack')}
          </PillButton>
        </div>
      </div>
    </ModalOverlay>
  );
}
