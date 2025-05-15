import { useTranslations } from 'next-intl';
import { Approach, Expertise, Innovation, Partnership } from '@/assets/icons/icons';

import OurPrinciplesSectionComponent, { PrinciplesItems } from '../OurPrinciplesSectionComponent';

const OurPrinciplesSection = () => {
  const t = useTranslations('Principles');

  const principlesItems = [
    {
      id: 21,
      title: t('principles.0.title'),
      description: t('principles.0.text'),
      icon: <Expertise />,
    },
    {
      id: 22,
      title: t('principles.1.title'),
      description: t('principles.1.text'),
      icon: <Approach />,
    },
    {
      id: 23,
      title: t('principles.2.title'),
      description: t('principles.2.text'),
      icon: <Innovation />,
    },
    {
      id: 24,
      title: t('principles.3.title'),
      description: t('principles.3.text'),
      icon: <Partnership />,
    },
  ] as PrinciplesItems[];

  return (
    <section className="w-full py-6">
      <div className="wrapper mx-auto">
        <OurPrinciplesSectionComponent principles={principlesItems} />
      </div>
    </section>
  );
};

export default OurPrinciplesSection;
