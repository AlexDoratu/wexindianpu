const fs = require('fs/promises');
const path = require('path');
const { DATA_DIR } = require('../config/constants');

function getFullPath(fileName) {
  return path.join(DATA_DIR, fileName);
}

async function readJson(fileName) {
  const raw = await fs.readFile(getFullPath(fileName), 'utf-8');
  return JSON.parse(raw);
}

async function writeJson(fileName, value) {
  const body = JSON.stringify(value, null, 2);
  await fs.writeFile(getFullPath(fileName), `${body}\n`, 'utf-8');
}

module.exports = {
  readJson,
  writeJson
};
