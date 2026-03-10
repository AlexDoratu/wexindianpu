const AppError = require('../utils/app-error');
const { validatePageConfigPayload } = require('../schemas/page-config-schema');
const {
  readAll,
  getByPageKey,
  saveByPageKey,
  appendHistory
} = require('../repositories/page-config-repository');

async function listPageConfigs() {
  const configs = await readAll();
  return Object.values(configs).map((item) => ({
    pageKey: item.pageKey,
    version: item.version,
    updatedAt: item.updatedAt,
    sectionCount: (item.sections || []).length
  }));
}

async function getPageConfig(pageKey) {
  return getByPageKey(pageKey);
}

async function upsertPageConfig(pageKey, payload) {
  validatePageConfigPayload(payload);

  const current = await getByPageKey(pageKey);
  const expectedVersion = payload.version;
  const currentVersion = current ? current.version : 0;

  if (expectedVersion !== currentVersion) {
    throw new AppError(409, `版本冲突，请先刷新后再保存（expected=${currentVersion}）`);
  }

  if (current) {
    await appendHistory(pageKey, current);
  }

  const next = {
    ...payload,
    pageKey,
    version: currentVersion + 1,
    updatedAt: new Date().toISOString()
  };

  await saveByPageKey(pageKey, next);
  return next;
}

module.exports = {
  listPageConfigs,
  getPageConfig,
  upsertPageConfig
};
