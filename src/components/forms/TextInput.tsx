/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import clsx from 'clsx';
import { useController, Control, FieldValues, FieldPath } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  as?: 'input' | 'textarea';
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  className?: string;
};

export default function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
  const {
    name,
    label,
    placeholder,
    control,
    className = '',
    as = 'input',
    type = 'text',
    autoComplete,
  } = props;

  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({ name, control });

  const errorId = `${name}-error`;
  const a11yProps = {
    'aria-label': label,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <label
      className={clsx(
        'relative flex p-[1px] bg-[#f5f5f5]',
        'outline-[2px] outline-offset-[2px] outline-transparent has-focus:outline-blue base-transition',
        as === 'input' ? 'rounded-[32px]' : 'rounded-[20px]',
        error ? 'bg-error' : 'bg-[#3f3030] dark:bg-gradient-to-r from-bright-green to-blue',
        className
      )}
    >
      {as === 'input' ? (
        <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder || label}
          {...a11yProps}
          {...field}
          className={clsx(
            'h-12 w-full px-[30px] rounded-[32px] bg-[#f5f5f5] dark:bg-[#0c1719]',
            'placeholder:text-[20px] placeholder:text-main leading-[1.4] placeholder:font-medium'
          )}
        />
      ) : (
        <textarea
          placeholder={placeholder || label}
          {...a11yProps}
          {...field}
          className={clsx(
            'resize-none w-full h-26 xl:h-23 px-[30px] py-[14px] rounded-[20px] bg-[#f5f5f5] dark:bg-[#0c1719]',
            'placeholder:text-[20px] placeholder:text-main leading-[1.4] placeholder:font-medium'
          )}
        />
      )}
      {error && (
        <p
          id={errorId}
          className="absolute left-[30px] top-0 -translate-y-[100%] text-[16px] font-medium text-main"
        >
          {error.message}
        </p>
      )}
    </label>
  );
}
