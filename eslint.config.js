import { lint } from '@batuhankorur/lint-config'

export default [
  ...lint(),
  {
    rules: {
      'unicorn/filename-case': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/explicit-length-check': 'off',
    },
  },
]
