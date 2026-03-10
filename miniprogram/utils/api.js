const { products } = require('../mock/products');
const { categories } = require('../mock/categories');
const { series } = require('../mock/series');
const { brand } = require('../mock/brand');
const { mapProduct } = require('./cms-adapter');

const BASE_URL = 'http://localhost:3000';
const USE_MOCK = true;

function request(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
          return;
        }
        reject(res.data || { message: '请求失败' });
      },
      fail: reject
    });
  });
}

function fromMock(value) {
  return Promise.resolve(value);
}

function getCategories() {
  return USE_MOCK ? fromMock(categories) : request('/categories');
}

function getSeries() {
  return USE_MOCK ? fromMock(series) : request('/series');
}

function getBrand() {
  return USE_MOCK ? fromMock(brand) : request('/brand');
}

function getProducts(options = {}) {
  const { category = 'all', keyword = '', sort = 'recommend' } = options;

  if (!USE_MOCK) {
    return request('/products', 'GET', { category, keyword, sort });
  }

  let list = products.map(mapProduct);

  if (category !== 'all') {
    list = list.filter((item) => item.category === category);
  }
  if (keyword) {
    list = list.filter((item) => item.name.includes(keyword));
  }

  if (sort === 'priceAsc') list.sort((a, b) => a.price - b.price);
  if (sort === 'priceDesc') list.sort((a, b) => b.price - a.price);
  if (sort === 'sales') list.sort((a, b) => b.sales - a.sales);
  if (sort === 'new') list.sort((a, b) => Number(b.isNew) - Number(a.isNew));

  return fromMock(list);
}

function getProductDetail(id) {
  if (!USE_MOCK) return request(`/products/${id}`);
  return fromMock(products.find((item) => item.id === id));
}

module.exports = {
  getCategories,
  getSeries,
  getBrand,
  getProducts,
  getProductDetail
};
