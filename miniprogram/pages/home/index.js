const { getSeries, getProducts } = require('../../utils/api');

Page({
  data: {
    banners: [
      { id: 1, image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1200&q=80', title: '轻盈贴身 新一季上新' },
      { id: 2, image: 'https://images.unsplash.com/photo-1616127390914-95f47f5b9fcd?auto=format&fit=crop&w=1200&q=80', title: '柔雾色系 细腻肌理' }
    ],
    seriesList: [],
    recommendList: []
  },
  onLoad() {
    this.loadData();
  },
  async loadData() {
    const [seriesList, recommendList] = await Promise.all([
      getSeries(),
      getProducts({ sort: 'recommend' })
    ]);
    this.setData({
      seriesList,
      recommendList: recommendList.filter((item) => item.recommend).slice(0, 4)
    });
  },
  goSeries() {
    wx.switchTab({ url: '/pages/series/index' });
  },
  goCategory() {
    wx.switchTab({ url: '/pages/category/index' });
  },
  openList(e) {
    const category = e.currentTarget.dataset.category || 'all';
    wx.navigateTo({ url: `/pages/product-list/index?category=${category}` });
  },
  openDetail(e) {
    wx.navigateTo({ url: `/pages/product-detail/index?id=${e.currentTarget.dataset.id}` });
  }
});
