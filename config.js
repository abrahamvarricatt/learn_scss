/**
Global config

Used by gulp tasks
*/

const ConfigOptions = function () {
  const config = this;
  // CSS stuff
  config.css = {
    // We are supporting the last 2 browsers, any browsers with >5% market share,
    // and ensuring we support IE9+ with prefixes
    browsers: ['> 5%', 'last 2 versions', 'ie > 8'], // config.css.browsers
  };
};

module.exports = new ConfigOptions();
