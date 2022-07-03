/* eslint-disable no-underscore-dangle */
const pino = require('pino');

const _logger = pino({
  mixin(_context, level) {
    return {
      app: 'library-server',
      'level-label': _logger.levels.labels[level],
    };
  },
});

const debug = (options) => {
  _logger.debug(options);
};

const info = (options) => {
  _logger.info(options);
};

const warn = (options) => {
  _logger.warn(options);
};

const error = (options) => {
  _logger.error(options);
};

const fatal = (options) => {
  _logger.fatal(options);
};

module.exports = {
  debug,
  warn,
  info,
  error,
  fatal,
};
