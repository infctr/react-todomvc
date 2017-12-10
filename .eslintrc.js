module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  extends: ['airbnb', 'prettier'],
  plugins: ['types', 'prettier'],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
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
};
