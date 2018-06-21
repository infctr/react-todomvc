module.exports = {
  parser: 'typescript-eslint-parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  extends: ['airbnb', 'prettier'],
  plugins: ['types', 'prettier'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },

  rules: {
    'import/first': [2, { 'absolute-first': 0 }],
    'react/jsx-filename-extension': [0],

    'react/jsx-closing-bracket-location': [
      2,
      {
        nonEmpty: 'after-props',
      },
    ],

    'prettier/prettier': [
      2,
      {
        jsxBracketSameLine: true,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
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
        'no-undef': 'off',
      },
    },
  ],
};
