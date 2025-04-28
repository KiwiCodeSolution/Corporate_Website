'use client';

import { Arrow } from '@/assets/icons/icons';

type IconButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function IconButton({ label, disabled = false, onClick }: IconButtonProps) {
  function clickHandler(e) {
    e.currentTarget.blur();
    onClick();
  }

  return (
    <div
      className="group relative flex justify-end items-center pl-[56px] pr-[48px] h-[48px] min-w-[150px] rounded-full cursor-pointer 
                outline-[2px] outline-offset-[2px] outline-transparent focus-within:outline-blue base-transition"
    >
      <div className="overflow-hidden absolute left-0 top-0 flex items-center justify-end pr-[48px] h-[48px] w-[48px] bg-accent rounded-full group-hover:w-[100%] base-transition">
        <span className=" text-[18px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 base-transition">
          {label}
        </span>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={clickHandler}
        className="absolute left-0 flex justify-center items-center size-[48px] rounded-full bg-accent cursor-pointer base-transition
        disabled:bg-disabled disabled:shadow-none disabled:cursor-default focus:outline-none"
      >
        {<Arrow />}
      </button>

      <span className="text-[18px] text-main">{label}</span>
    </div>
  );
}
