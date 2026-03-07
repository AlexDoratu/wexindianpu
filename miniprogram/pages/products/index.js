const { getProducts } = require('../../utils/api');

Page({
  data: {
    categories: ['全部', '连衣裙', '上衣', '裤子', '套装'],
    currentCategory: '全部',
    products: [],
    loading: false
  },

  onLoad() {
    this.fetchProducts();
  },

  async fetchProducts() {
    this.setData({ loading: true });
    const category = this.data.currentCategory === '全部' ? '' : this.data.currentCategory;
    try {
      const res = await getProducts(category);
      this.setData({ products: res.data || [] });
    } catch (error) {
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  onChangeCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ currentCategory: category }, () => this.fetchProducts());
  },

  toDetail(e) {
    const product = e.currentTarget.dataset.product;
    wx.navigateTo({
      url: `/pages/product-detail/index?product=${encodeURIComponent(JSON.stringify(product))}`
    });
  }
});
