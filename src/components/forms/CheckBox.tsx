import clsx from 'clsx';
import { useController, FieldPath, FieldValues, Control } from 'react-hook-form';

import { CheckIcon } from '@/assets/icons/icons';

type CheckBoxProps<T extends FieldValues> = {
  name: FieldPath<T>;
  disabled?: boolean;
  control: Control<T>;
  label?: string;
  className?: string;
};

export default function CheckBox<T extends FieldValues>(props: CheckBoxProps<T>) {
  const { disabled = false, name, control, label, className = '' } = props;

  const {
    field: { ref, value: checked, onChange },
  } = useController({ name, control });

  return (
    // <label
    //   className={clsx(
    //     'flex justify-center items-center size-5 rounded-[4px] border-[1px] border-accent bg-[#ffffff] dark:bg-[#0C1719] cursor-pointer hover:shadow-base',
    //     'has-checked:bg-accent'
    //   )}
    // >
    //   <input
    //     type="checkbox"
    //     className="peer sr-only "
    //     checked={value}
    //     onChange={(e) => onChange(e.target.checked)}
    //   />
    //   <CheckIcon className="text-[#ffffff] dark:text-[#0C1719]  opacity-[0] peer-checked:opacity-[100%]" />
    // </label>

    <label className={clsx('flex items-center gap-x-3 cursor-pointer select-none', className)}>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <div
        className={clsx(
          'flex justify-center items-center size-5 rounded-[4px] border-[1px] border-accent bg-[#ffffff] dark:bg-[#0C1719] hover:shadow-base',
          'peer-checked:bg-accent'
        )}
      >
        {checked && <CheckIcon className="text-main" />}
      </div>
      {label && <span className="text-[16px] text-main font-medium leading-[1.35]">{label}</span>}
    </label>
  );
}
