module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['react-app', 'plugin:@typescript-eslint/recommended', 'prettier/prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    'import/no-anonymous-default-export': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
