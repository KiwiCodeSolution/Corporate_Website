import { Cross } from '@/assets/icons/icons';
import IconButton from '../buttons/IconButton';

type ModalWrapperProps = {
  children: React.ReactNode;
  closeModal: () => void;
  styles?: string;
  type: 'baseModal' | 'notification' | 'modalOnPage'; // 'baseModal'  - буде стилізовано як звичайну мадалку великого розміру| 'notification' - для сповіщень, маленька мадалка
};

const ModalWrapper = ({ children, closeModal, styles, type }: ModalWrapperProps) => {
  const widthStyles =
    type === 'baseModal'
      ? 'w-4/5 xl:w-[1064px]'
      : type === 'notification'
        ? 'w-full md:w-4/5 xl:w-[734px]'
        : 'w-full md:w-4/5 xl:w-[800px]';

  return (
    <div
      className={`flex flex-col bg-white rounded-base mx-auto relative py-12 px-20 ${styles} ${widthStyles} h-4/5 overflow-hidden`}
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
