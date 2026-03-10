const { getCategories, getSeries, getBrand } = require('../services/content-service');
const { success, fail } = require('../utils/http');

async function listCategories(req, res) {
  try {
    const data = await getCategories();
    return success(res, data);
  } catch (error) {
    return fail(res, 500, '读取分类数据失败');
  }
}

async function listSeries(req, res) {
  try {
    const data = await getSeries();
    return success(res, data);
  } catch (error) {
    return fail(res, 500, '读取系列数据失败');
  }
}

async function getBrandInfo(req, res) {
  try {
    const data = await getBrand();
    return success(res, data);
  } catch (error) {
    return fail(res, 500, '读取品牌数据失败');
  }
}

module.exports = {
  listCategories,
  listSeries,
  getBrandInfo
};
