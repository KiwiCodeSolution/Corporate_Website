import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@next/next/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-debugger': 'error',
      // 'no-console': 'warn',
      'prefer-const': 'error',
      eqeqeq: 'error',
      'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }],
      'import/no-unresolved': 'error',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.css'],
        },
      },
    },
  }),
];

export default eslintConfig;
