import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'prefer-const': 'error',
      eqeqeq: 'error',
      'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }],
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', '.claude/**', 'docs/**'],
  },
];

export default eslintConfig;
