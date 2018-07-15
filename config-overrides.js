const rewireTypescript = require('react-app-rewire-awesome-typescript');

module.exports = function override(config, env) {
  // eslint-disable-next-line no-param-reassign
  config = rewireTypescript(config, env, {
    errorsAsWarnings: true,
    useCache: true,
  });

  return config;
};
