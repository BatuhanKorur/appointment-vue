import eslintConfig from '@batuhankorur/eslint'

export default [
  ...eslintConfig,
  {
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
  },
]
