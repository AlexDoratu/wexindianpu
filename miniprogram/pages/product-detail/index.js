const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80';

Page({
  data: {
    product: null,
    fallbackImage: FALLBACK_IMAGE
  },

  onLoad(options) {
    if (options.product) {
      const rawProduct = JSON.parse(decodeURIComponent(options.product));
      const product = this.normalizeProduct(rawProduct);
      this.setData({ product });
    }
  },

  normalizeProduct(rawProduct = {}) {
    const scenes = Array.isArray(rawProduct.scenes) ? rawProduct.scenes : [];
    const colors = Array.isArray(rawProduct.colors) ? rawProduct.colors : [];
    const sizes = Array.isArray(rawProduct.sizes) ? rawProduct.sizes : [];
    const images = Array.isArray(rawProduct.images) && rawProduct.images.length
      ? rawProduct.images
      : [rawProduct.mainImage || FALLBACK_IMAGE];

    return {
      ...rawProduct,
      images,
      scenesText: scenes.join(' / '),
      colorsText: colors.join(' / '),
      sizesText: sizes.join(' / ')
    };
  },

  onSwiperImageError(e) {
    const index = Number(e.currentTarget.dataset.index);
    const { product } = this.data;
    if (!product || Number.isNaN(index)) return;
    const nextImages = [...product.images];
    nextImages[index] = FALLBACK_IMAGE;
    this.setData({ 'product.images': nextImages });
  },

  goConsult() {
    const { product } = this.data;
    wx.navigateTo({
      url: `/pages/lead-form/index?product=${encodeURIComponent(JSON.stringify(product || {}))}`
    });
  }
});
