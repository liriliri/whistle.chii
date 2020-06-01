const path = require('path');
const fs = require('fs').promises;

const scriptPath = path.resolve(__dirname, '../script.txt');

module.exports = function (server, options) {
  server.on('request', async (req, res) => {
    await writeScript(options);
    res.end(`* htmlAppend://${scriptPath}`);
  });
};

let isInit = false;
async function writeScript(options) {
  if (isInit) return;
  isInit = true;
  await fs.writeFile(
    scriptPath,
    `<script src="${
      options.config.WEBUI_PATH + 'whistle.chii/target.js'
    }"></script>`
  );
}
