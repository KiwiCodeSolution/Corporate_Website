import { Cross } from '@/assets/icons/icons';
import IconButton from '../buttons/IconButton';

type ModalWrapperProps = {
  children: React.ReactNode;
  closeModal: () => void;
  styles?: string;
  type: 'baseModal' | 'notification';
};

const ModalWrapper = ({ children, closeModal, styles, type }: ModalWrapperProps) => {
  const widthStyles = type === 'baseModal' ? 'w-4/5 xl:w-[1064px]' : 'w-full md:w-4/5 xl:w-[734px]';

  return (
    <div
      className={`flex flex-col bg-white rounded-base mx-auto relative py-12 px-20 h-4/5 ${styles} ${widthStyles} overflow-hidden`}
    >
      <IconButton
        // onClick={(e) => {
        //   e.stopPropagation();
        //   closeModal();
        // }}
        onClick={closeModal}
        size="s"
        disabled={false}
        className="absolute top-8 right-8"
        icon={Cross}
      />
      <div className="overflow-auto">{children}</div>
    </div>
  );
};

export default ModalWrapper;
