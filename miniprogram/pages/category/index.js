const { getCategories } = require('../../utils/api');

Page({
  data: { categories: [] },
  onShow() { this.load(); },
  async load() {
    const categories = await getCategories();
    this.setData({ categories });
  },
  openList(e) {
    const category = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/product-list/index?category=${category}` });
  }
});
