module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['prettier', 'jest', '@typescript-eslint'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'import/first': [2, { 'absolute-first': 0 }],
    'react/prop-types': 0,
    'prettier/prettier': [
      2,
      {
        jsxBracketSameLine: true,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],

    'react/destructuring-assignment': [0], // airbnb 17.0
    'react/jsx-closing-bracket-location': [
      2,
      {
        nonEmpty: 'after-props',
      },
    ],
    'react/jsx-filename-extension': [0],
    'react/jsx-one-expression-per-line': [0], // airbnb 17.0

    '@typescript-eslint/no-unused-vars': [2],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-undef': [0],
        'no-unused-vars': [0],
        'no-use-before-define': ['error', { functions: false, classes: false }],
        'import/prefer-default-export': 0,
        'import/no-unresolved': 0,
      },
    },
    {
      files: ['config-overrides.js', 'src/setupTests.js', '**/*.test.{ts,tsx}'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'spaced-comment': 0,
      },
    },
  ],
};
