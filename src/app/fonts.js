import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: true,
});

export { montserrat };
