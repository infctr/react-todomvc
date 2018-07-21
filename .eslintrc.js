module.exports = {
  parser: 'typescript-eslint-parser',
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
  plugins: ['types', 'prettier', 'jest', 'typescript'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },

  rules: {
    'import/first': [2, { 'absolute-first': 0 }],
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

    'typescript/no-unused-vars': [2],
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
      parser: 'typescript-eslint-parser',
      rules: {
        'no-undef': [0],
        'no-unused-vars': [0],
        'no-use-before-define': ['error', { functions: false, classes: false }],
        'import/prefer-default-export': 0,
        'import/no-unresolved': 0,
      },
    },
    {
      files: ['config-overrides.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
