import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/, // чтобы только из JS/TS импортировать как компонент
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
