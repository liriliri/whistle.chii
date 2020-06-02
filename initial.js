const path = require('path');
const rmdir = require('licia/rmdir');
const mkdir = require('licia/mkdir');

const scriptsPath = path.resolve(__dirname, './scripts');
rmdir(scriptsPath, () => mkdir(scriptsPath));

module.exports = (options) => options;
