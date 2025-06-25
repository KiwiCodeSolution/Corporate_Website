import clsx from 'clsx';
import { Cross } from '@/assets/icons/icons';
import IconButton from '../buttons/IconButton';
import '../../../styles/globals.css';

type ModalWrapperProps = {
  children: React.ReactNode;
  closeModal: () => void;
  styles?: string;
  type: 'baseModal' | 'notification' | 'modalOnPage'; // 'baseModal'  - буде стилізовано як звичайну мадалку великого розміру| 'notification' - для сповіщень, маленька мадалка
};

const ModalWrapper = ({ children, closeModal, styles, type }: ModalWrapperProps) => {
  const widthStyles = clsx({
    'w-4/5 xl:w-[1064px]': type === 'baseModal',
    'w-full md:w-4/5 xl:w-[734px]': type === 'notification',
    'w-full md:w-4/5 xl:w-[800px]': type === 'modalOnPage',
  });

  return (
    <div
      className={clsx(
        'flex flex-col bg-bgColor rounded-base mx-auto relative py-12 px-20 h-4/5 overflow-hidden modal-wrapper-border',
        widthStyles,
        styles
      )}
    >
      <IconButton
        onClick={closeModal}
        size="s"
        disabled={false}
        className="absolute top-8 right-8"
        icon={Cross}
      />
      <div className="overflow-auto my-auto">{children}</div>
    </div>
  );
};

export default ModalWrapper;
