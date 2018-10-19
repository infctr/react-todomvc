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
    // eslint-disable-next-line no-param-reassign
    config.coveragePathIgnorePatterns = [
      ...(config.coveragePathIgnorePatterns || []),
      '<rootDir>/src/.*.d.ts',
    ];

    // eslint-disable-next-line no-param-reassign
    config.moduleNameMapper = {
      '\\.module\\.scss$': 'identity-obj-proxy',
    };

    // eslint-disable-next-line no-param-reassign
    config.snapshotSerializers = ['enzyme-to-json/serializer'];
    // eslint-disable-next-line no-param-reassign
    config.setupFiles = [...config.setupFiles, '<rootDir>/src/setupTests.js'];

    return config;
  },
};
