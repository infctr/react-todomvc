module.exports = {
  '*.{ts,tsx}': ['tslint --project . --format verbose --fix', 'eslint --fix'],
  '*.js': 'eslint --fix',
  '*.{scss,md,yml,json}': 'prettier --write',
};
