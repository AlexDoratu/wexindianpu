const AppError = require('../utils/app-error');
const {
  listPageConfigs,
  getPageConfig,
  upsertPageConfig
} = require('../services/page-config-service');
const { success } = require('../utils/http');

async function listConfigs(req, res, next) {
  try {
    const data = await listPageConfigs();
    return success(res, data);
  } catch (error) {
    return next(error);
  }
}

async function getConfig(req, res, next) {
  try {
    const data = await getPageConfig(req.params.pageKey);
    if (!data) {
      throw new AppError(404, '页面配置不存在');
    }

    return success(res, data);
  } catch (error) {
    return next(error);
  }
}

async function saveConfig(req, res, next) {
  try {
    const data = await upsertPageConfig(req.params.pageKey, req.body);
    return success(res, data, '保存成功');
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listConfigs,
  getConfig,
  saveConfig
};
