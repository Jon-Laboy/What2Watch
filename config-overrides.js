const path = require('path');

module.exports = {
  webpack: function (config, env) {
    config.resolve.fallback = {
      fs: false,
      path: require.resolve('path-browserify')
    };
    return config;
  }
};
