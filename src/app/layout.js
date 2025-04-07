import '@/styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { montserrat } from './fonts';

// let str3 = 'Hallo';

export const metadata = {
  title: 'KiWiCode Solutions',
  description: '',
  icons: {},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
