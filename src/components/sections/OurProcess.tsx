'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ProcessFirstImageBlock from '../ProcessFirstImageBlock';
import ProcessSecondImageBlock from '../ProcessSecondImageBlock';
import ProcessThirdImageBlock from '../ProcessThirdImageBlock';
import ProcessThirdImageBlockAdaptation from '../ProcessThirdImageBlockAdaptation';

const OurProcess = () => {
  const { theme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section className="w-full xl:h-[544px] my-[104px] our-process-section">
      <div className="wrapper mx-auto flex flex-col xl:flex-row gap-y-[26px]">
        <div className="flex items-center justify-between">
          {/* перше зображення */}

          <ProcessFirstImageBlock theme={theme} />

          {/* друге зображення */}
          <ProcessSecondImageBlock theme={theme} />
        </div>

        {/* трете зображення */}
        <ProcessThirdImageBlock theme={theme} />
        <ProcessThirdImageBlockAdaptation theme={theme} />
      </div>
    </section>
  );
};

export default OurProcess;
