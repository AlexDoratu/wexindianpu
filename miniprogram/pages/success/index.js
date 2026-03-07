Page({
  goHome() {
    wx.reLaunch({ url: '/pages/home/index' });
  },
  goProducts() {
    wx.reLaunch({ url: '/pages/products/index' });
  }
});
