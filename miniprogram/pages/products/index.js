const { getProducts } = require('../../utils/api');

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80';

Page({
  data: {
    categories: ['全部', '连衣裙', '上衣', '裤子', '套装', '外套'],
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

  onProductImageError(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (Number.isNaN(index)) return;
    const products = [...this.data.products];
    if (!products[index]) return;
    products[index].mainImage = FALLBACK_IMAGE;
    this.setData({ products });
  },

  toDetail(e) {
    const product = e.currentTarget.dataset.product;
    wx.navigateTo({
      url: `/pages/product-detail/index?product=${encodeURIComponent(JSON.stringify(product))}`
    });
  }
});
