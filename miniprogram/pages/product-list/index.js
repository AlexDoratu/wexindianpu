const { getProducts, getCategories } = require('../../utils/api');

Page({
  data: {
    products: [],
    categories: [{ id: 'all', name: '全部' }],
    currentCategory: 'all',
    sortOptions: [
      { id: 'recommend', name: '推荐' },
      { id: 'sales', name: '热度' },
      { id: 'new', name: '上新' },
      { id: 'priceAsc', name: '价格↑' },
      { id: 'priceDesc', name: '价格↓' }
    ],
    currentSort: 'recommend',
    favorites: {}
  },
  async onLoad(options) {
    const categories = await getCategories();
    const currentCategory = options.category || 'all';
    this.setData({ categories: [{ id: 'all', name: '全部' }, ...categories], currentCategory });
    this.loadProducts();
  },
  async loadProducts() {
    const products = await getProducts({
      category: this.data.currentCategory,
      sort: this.data.currentSort
    });
    this.setData({ products });
  },
  changeCategory(e) {
    this.setData({ currentCategory: e.currentTarget.dataset.id });
    this.loadProducts();
  },
  changeSort(e) {
    this.setData({ currentSort: e.currentTarget.dataset.id });
    this.loadProducts();
  },
  toggleFav(e) {
    const { id } = e.currentTarget.dataset;
    const key = `favorites.${id}`;
    this.setData({ [key]: !this.data.favorites[id] });
  },
  openDetail(e) {
    wx.navigateTo({ url: `/pages/product-detail/index?id=${e.currentTarget.dataset.id}` });
  }
});
