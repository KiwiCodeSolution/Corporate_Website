import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BackgroundPageGradient from '@/components/ui/BackgroundPageGradient';
import { ModalProvider } from '../context/ModalContext';
import { montserrat } from './fonts';
import '@/styles/globals.css';
import '@/styles/services-page.css';

export const metadata = {
  title: 'KiWiCode Solutions',
  description: '',
  icons: {},
};

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased pt-24 md:pt-20 relative h-fit `}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <ModalProvider>
              <Header />
              <div className="relative overflow-hidden">
                <BackgroundPageGradient page="home" />
                {children}
                {modal}
              </div>

              <Footer locale={locale} />

              <div id="modal-root"></div>
            </ModalProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
