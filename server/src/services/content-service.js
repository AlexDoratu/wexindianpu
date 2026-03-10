const { readJson } = require('../repositories/json-repository');

async function getCategories() {
  return readJson('categories.json');
}

async function getSeries() {
  return readJson('series.json');
}

async function getBrand() {
  return readJson('brand.json');
}

module.exports = {
  getCategories,
  getSeries,
  getBrand
};
