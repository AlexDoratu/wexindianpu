const { getSeries } = require('../../utils/api');

Page({
  data: { list: [] },
  async onShow() {
    const list = await getSeries();
    this.setData({ list });
  },
  toProducts() {
    wx.navigateTo({ url: '/pages/product-list/index' });
  }
});
