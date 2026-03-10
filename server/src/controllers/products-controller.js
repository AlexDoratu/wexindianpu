const { listProducts, getProductById } = require('../services/products-service');
const { success, fail } = require('../utils/http');

async function getProducts(req, res) {
  try {
    const data = await listProducts(req.query);
    return success(res, data);
  } catch (error) {
    return fail(res, 500, '读取商品数据失败');
  }
}

async function getProductDetail(req, res) {
  try {
    const data = await getProductById(req.params.id);
    if (!data) {
      return fail(res, 404, '商品不存在');
    }
    return success(res, data);
  } catch (error) {
    return fail(res, 500, '读取商品数据失败');
  }
}

module.exports = {
  getProducts,
  getProductDetail
};
