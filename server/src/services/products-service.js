const { readJson } = require('../repositories/json-repository');

function applyProductsQuery(products, query = {}) {
  const {
    category,
    keyword,
    sort = 'recommend'
  } = query;

  let list = [...products];

  if (category && category !== 'all') {
    list = list.filter((item) => item.category === category);
  }

  if (keyword) {
    list = list.filter((item) => item.name.includes(keyword));
  }

  if (sort === 'priceAsc') list.sort((a, b) => a.price - b.price);
  if (sort === 'priceDesc') list.sort((a, b) => b.price - a.price);
  if (sort === 'sales') list.sort((a, b) => (b.sales || 0) - (a.sales || 0));
  if (sort === 'new') list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));

  return list;
}

async function listProducts(query) {
  const products = await readJson('products.json');
  return applyProductsQuery(products, query);
}

async function getProductById(id) {
  const products = await readJson('products.json');
  return products.find((item) => item.id === id) || null;
}

module.exports = {
  listProducts,
  getProductById
};
