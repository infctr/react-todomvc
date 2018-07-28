const rewireTypescript = require('react-app-rewire-awesome-typescript');

/* istanbul ignore next */
module.exports = {
  webpack: (config, env) => {
    // eslint-disable-next-line no-param-reassign
    config = rewireTypescript(config, env, {
      errorsAsWarnings: true,
      useCache: true,
    });

    return config;
  },

  jest: config => {
    if (!config.coveragePathIgnorePatterns) {
      // eslint-disable-next-line no-param-reassign
      config.coveragePathIgnorePatterns = [];
    }

    // eslint-disable-next-line no-param-reassign
    config.coveragePathIgnorePatterns = [
      ...config.coveragePathIgnorePatterns,
      '<rootDir>/src/.*.d.ts',
    ];

    return config;
  },
};
