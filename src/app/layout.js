import './globals.css';

import { montserrat } from './fonts';

export const metadata = {
  title: 'KiWiCode Solutions',
  description: '',
  icons: {},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
