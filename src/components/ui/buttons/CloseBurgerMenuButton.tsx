import clsx from 'clsx';
import { MouseEvent } from 'react';
import { GradientedCross } from '@/assets/icons/icons';

type CloseBurgerMenuButtonProps = {
  className?: string;
  clickFn: () => void;
};

export default function CloseBurgerMenuButton(props: CloseBurgerMenuButtonProps) {
  const { clickFn, className = '' } = props;

  function clickHandler(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.currentTarget.blur();
    if (!clickFn) return;
    clickFn();
  }

  return (
    <button
      type="button"
      onClick={clickHandler}
      className={clsx(
        'size-12 flex justify-center items-center  rounded-full base-gradient ',
        className
      )}
    >
      <div className="size-11 flex justify-center items-center rounded-full bg-bgColor">
        <GradientedCross className="size-4" />
      </div>
    </button>
  );
}
