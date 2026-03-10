const { getProductDetail } = require('../../utils/api');

Page({
  data: {
    product: null,
    favorite: false
  },
  async onLoad(options) {
    const product = await getProductDetail(options.id);
    this.setData({ product });
  },
  toggleFav() {
    this.setData({ favorite: !this.data.favorite });
  }
});
