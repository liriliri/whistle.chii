const chii = require('chii')

module.exports = function (server) {
  chii.start({
    server,
    domain: 'local.whistlejs.com/whistle.chii',
  })
}
