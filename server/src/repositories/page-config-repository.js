const path = require('path');
const fs = require('fs/promises');
const { DATA_DIR } = require('../config/constants');
const { readJson, writeJson } = require('./json-repository');

const CONFIG_FILE = 'page-configs.json';

async function readAll() {
  return readJson(CONFIG_FILE);
}

async function getByPageKey(pageKey) {
  const all = await readAll();
  return all[pageKey] || null;
}

async function saveByPageKey(pageKey, config) {
  const all = await readAll();
  all[pageKey] = config;
  await writeJson(CONFIG_FILE, all);
}

async function appendHistory(pageKey, snapshot) {
  const historyDir = path.join(DATA_DIR, 'history');
  await fs.mkdir(historyDir, { recursive: true });
  const historyPath = path.join(historyDir, `page-config-${pageKey}.jsonl`);
  const line = `${JSON.stringify({ savedAt: new Date().toISOString(), snapshot })}\n`;
  await fs.appendFile(historyPath, line, 'utf-8');
}

module.exports = {
  readAll,
  getByPageKey,
  saveByPageKey,
  appendHistory
};
