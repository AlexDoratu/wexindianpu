Page({
  data: {
    product: null
  },

  onLoad(options) {
    if (options.product) {
      const product = JSON.parse(decodeURIComponent(options.product));
      this.setData({ product });
    }
  },

  goConsult() {
    const { product } = this.data;
    wx.navigateTo({
      url: `/pages/lead-form/index?product=${encodeURIComponent(JSON.stringify(product || {}))}`
    });
  }
});
