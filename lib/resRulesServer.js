const path = require('path');
const fs = require('licia/fs');
const stripIndent = require('licia/stripIndent');
const escapeJsStr = require('licia/escapeJsStr');

module.exports = function (server, options) {
  server.on('request', async (req, res) => {
    const scriptPath = await writeScript(
      options.config.WEBUI_PATH,
      req.originalReq.ruleValue
    );
    res.end(`* htmlAppend://${scriptPath}`);
  });

  const cache = {};

  async function writeScript(webuiPath, title = 'anonymous') {
    const scriptPath = path.resolve(
      __dirname,
      '../scripts/',
      `script.${title}.txt`
    );
    if (cache[scriptPath]) {
      return scriptPath;
    }
    cache[scriptPath] = true;
    await fs.writeFile(
      scriptPath,
      stripIndent`
        <script>
          window.ChiiTitle = "${escapeJsStr(title)}";
          window.ChiiServerUrl = location.host + "${webuiPath}whistle.chii";
        </script>
        <script src="${webuiPath + 'whistle.chii/target.js'}"></script>
      `
    );
    return scriptPath;
  }
};
