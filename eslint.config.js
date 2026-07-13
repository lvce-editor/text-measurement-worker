import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default [
  ...config.default,
  ...actions.default,
  ...tsconfig.default,
  {
    rules: {
      'unicorn/consistent-function-scoping': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@cspell/spellchecker': 'off',
      'jest/expect-expect': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/different-types-comparison': 'off',
      'sonarjs/no-identical-functions': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'sonarjs/single-char-in-character-classes': 'off',
      'sonarjs/super-linear-regex': 'off',
      'tsconfig/dont-skip-lib-check': 'off',
      'unicorn/consistent-class-member-order': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/no-top-level-assignment-in-function': 'off',
      'unicorn/no-unnecessary-global-this': 'off',
      'unicorn/no-unsafe-string-replacement': 'off',
      'unicorn/prefer-number-coercion': 'off',
    },
  },
]
