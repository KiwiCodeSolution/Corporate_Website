'use client';

import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useModal } from '@/app/context/ModalContext';
import { Arrow } from '@/assets/icons/icons';
import ContactUsImage from '../../../public/images/robot-hand_contact_us.png';
// import Title from '../Title';
import PillButton from '../ui/buttons/PillButton';
import ContactFormModal from '../ui/modal/ContactFormModal';

export default function ContactUsSection() {
  const { modal, openModal, closeModal } = useModal();
  const t = useTranslations('buttons');
  const t2 = useTranslations('ContactUs');

  const currentLocal = useLocale();
  console.log('currentLocal :>> ', currentLocal);

  const isContactModalOpen = modal === 'contact';
  return (
    <div className="flex w-full  h-[519px]  justify-center items-center bg-[url(/images/bg_contact_us.svg)] bg-no-repeat bg-cover bg-[position:0px_-40px]">
      <div className="w-[345px] md:w-[704px] xl:w-[888px] md:h-[337px] dark:p-[1px] rounded-[20px]  dark:bg-gradient-to-b dark:from-bright-green dark:to-blue">
        <div className="relative w-full h-full px-[16px] md:px-[75px] py-[40px] md:py-[48px] xl:py-[30px] rounded-[20px] bg-bgColor">
          <div className="md:absolute sr-only md:not-sr-only md:right-6 xl:right-16 md:bottom-0 md:w-[243px] md:h-[258px]">
            <Image
              src={ContactUsImage}
              alt="robot-hand"
              className="md:absolute sr-only md:not-sr-only min-w-[299px] h-[437px] md:-right-14 md:bottom-0 "
            />
            <div className="absolute left-0 bottom-0 w-full h-full robot-hand-gradient opacity-0 dark:opacity-100"></div>
          </div>
          <div className="absolute left-0 bottom-0 w-full h-[126px] rounded-b-[20px] bg-gradient-to-b from-transparent to-[#99E6DC] dark:to-transparent"></div>
          <div className="relative flex flex-col justify-between md:items-start  md:w-2/3 xl:w-1/2 h-full">
            {/* <Title tag="h2" styles="mx-auto md:mx-0 whitespace-nowrap">
              {t2('title')}
            </Title> */}
            <h2
              className={clsx(
                currentLocal === 'ua'
                  ? 'text-[32px] md:text-[38px]'
                  : 'text-[32px] md:text-[44px] xl:text-[52px]',
                'leading-[1.2] font-semibold mx-auto md:mx-0 whitespace-nowrap'
              )}
            >
              {t2('title')}
            </h2>
            <p
              className={clsx(
                currentLocal === 'ua' ? 'md:text-[22px]' : 'text-[18px] md:text-[24px]',
                'text-center md:text-left mt-[24px] md:mt-0 leading-[1.6] md:leading-[1.4]'
              )}
            >
              {t2('text')}
            </p>
            <PillButton
              className="mt-[24px] md:mt-0 mx-auto md:mx-0 h-[44px] md:h-[48px]"
              size="l"
              icon={Arrow}
              iconProps={{ xl: true }}
              onClick={() => openModal('contact')}
            >
              {t('letsWork')}
            </PillButton>
          </div>
        </div>
      </div>
      <ContactFormModal onClose={closeModal} isOpen={isContactModalOpen} />
    </div>
  );
}
