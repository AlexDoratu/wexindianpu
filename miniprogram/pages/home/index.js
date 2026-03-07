const { getProducts } = require('../../utils/api');

Page({
  data: {
    hotProducts: []
  },

  onLoad() {
    this.loadHotProducts();
  },

  async loadHotProducts() {
    try {
      const res = await getProducts();
      const hotProducts = (res.data || []).slice(0, 3);
      this.setData({ hotProducts });
    } catch (error) {
      wx.showToast({ title: '推荐加载失败', icon: 'none' });
    }
  },

  goProducts() {
    wx.navigateTo({ url: '/pages/products/index' });
  },

  goLeadForm() {
    wx.navigateTo({ url: '/pages/lead-form/index' });
  },

  toDetail(e) {
    const product = e.currentTarget.dataset.product;
    wx.navigateTo({
      url: `/pages/product-detail/index?product=${encodeURIComponent(JSON.stringify(product))}`
    });
  }
});
