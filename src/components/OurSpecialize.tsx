import { useTranslations } from 'next-intl';
import { IPoint, TitleFooter } from './Footer';
import ServicePoint from './ServicePoint';

const OurSpecialize = () => {
  const t = useTranslations();
  const SPECIALISELIST: IPoint[] = [
    { id: '3g26MCNn2uLu', label: t('technologies.UI/UX Design'), order: 'order-1 xl:order-1' },
    { id: '5cpD852pnTSJ', label: t('technologies.Development'), order: 'order-3 xl:order-2' },
    { id: 'e4bi8rA8RUK2', label: t('technologies.SMM'), order: 'order-2 xl:order-3' },
    { id: 'Nd5Sf8G45Yic', label: t('technologies.Marketing'), order: 'order-4 xl:order-4' },
    { id: 'g54SZMdh3U7u', label: t('technologies.Branding'), order: 'order-5 xl:order-5' },
    { id: 'BU4rbhE68yF6', label: t('technologies.Optimisation'), order: 'order-6 xl:order-6' },
    {
      id: '5rVnTs92xH6T',
      label: t('technologies.Creative Solutions'),
      order: 'order-7 xl:order-7',
    },
  ];

  return (
    <div className="w-[340px] xl:w-[408px] flex flex-col gap-y-6">
      <TitleFooter text={t('Footer.specialize_list_title')} />

      <ul className="w-full flex flex-wrap gap-x-4 gap-y-3">
        {SPECIALISELIST.map((el) => (
          <ServicePoint key={el.id} label={el.label} styles={el.order} />
        ))}
      </ul>
    </div>
  );
};

export default OurSpecialize;
