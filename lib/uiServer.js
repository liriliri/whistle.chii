const chii = require('chii');

module.exports = function (server, options) {
  chii.start({
    server,
    domain: 'local.whistlejs.com' + options.config.WEBUI_PATH + 'whistle.chii',
  });
};
