import clsx from 'clsx';
import React from 'react';

const Title = ({
  tag,
  styles,
  children,
}: {
  tag?: string;
  styles?: string;
  children: React.ReactNode;
}) => {
  const commonStyles = 'font-semibold leading-[1.2] text-main-title';

  if (tag === 'h1') {
    return <h1 className={clsx(styles, 'text-[52px]', commonStyles)}>{children}</h1>;
  }

  if (tag === 'h2') {
    return (
      <h2
        className={clsx(
          styles,
          'text-[32px] md:text-[44px] xl:text-[52px] text-main-title',
          commonStyles
        )}
      >
        {children}
      </h2>
    );
  }

  return <h3 className={clsx(styles, 'text-2xl leading-[1.3] text-main-title')}>{children}</h3>;
};

export default Title;
