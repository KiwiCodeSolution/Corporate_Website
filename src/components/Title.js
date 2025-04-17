import PropTypes from 'prop-types';
import clsx from 'clsx';

const Title = ({ tag, children, styles, section }) => {
  const commonStyles = 'font-semibold leading-[1.2]';

  // у всіх секціях, окрім Contact us, відступ знизу складає 48 пікселів. У секції Contact us він 30 пікселів. Для коректного відображення у пропсі section потрібно передати "contact" у секції Contact us

  const marginBottom = clsx({
    'mb-[30px]': section === 'contact',
    'mb-10 xl:mb-12': section !== 'contact',
  });

  if (tag === 'h1') {
    return <h1 className={clsx(styles, 'text-[52px]', commonStyles)}>{children}</h1>;
  }

  if (tag === 'h2') {
    return (
      <h2
        className={clsx(
          styles,
          'text-[32px] md:text-[44px] xl:text-[52px]',
          commonStyles,
          marginBottom
        )}
      >
        {children}
      </h2>
    );
  }

  return <h3 className={clsx(styles, 'text-2xl leading-[1.3]')}>{children}</h3>;
};

Title.propTypes = {
  tag: PropTypes.oneOf(['h1', 'h2']),
  children: PropTypes.node.isRequired,
  styles: PropTypes.string,
};

export default Title;
