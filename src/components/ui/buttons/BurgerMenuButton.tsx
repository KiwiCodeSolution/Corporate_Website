import clsx from 'clsx';
import { Burger } from '@/assets/icons/icons';

type BurgerButtonProps = {
  className?: string;
  clickFn: () => void;
};

export default function BurgerMenuButton({ clickFn, className = '' }: BurgerButtonProps) {
  return (
    <button
      type="button"
      onClick={clickFn}
      className={clsx('size-12 flex justify-center items-center rounded-md', className)}
    >
      <Burger />
    </button>
  );
}
