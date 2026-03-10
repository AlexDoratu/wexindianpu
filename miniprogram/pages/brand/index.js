const { getBrand } = require('../../utils/api');

Page({
  data: { brand: null },
  async onShow() {
    const brand = await getBrand();
    this.setData({ brand });
  }
});
