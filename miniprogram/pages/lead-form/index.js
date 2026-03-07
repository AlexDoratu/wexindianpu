const { createLead } = require('../../utils/api');

Page({
  data: {
    form: {
      name: '',
      mobile: '',
      wechatId: '',
      productId: '',
      productName: '',
      color: '',
      size: '',
      remark: ''
    },
    submitting: false
  },

  onLoad(options) {
    if (options.product) {
      const product = JSON.parse(decodeURIComponent(options.product));
      this.setData({
        'form.productId': product.id || '',
        'form.productName': product.name || ''
      });
    }
  },

  onInput(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ [`form.${key}`]: e.detail.value });
  },

  async onSubmit() {
    const { form, submitting } = this.data;
    if (submitting) return;

    if (!form.name || !form.mobile || !form.wechatId || !form.productName) {
      wx.showToast({ title: '请填写必填项', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });
    try {
      const res = await createLead(form);
      if (res.code === 0) {
        wx.redirectTo({ url: '/pages/success/index' });
      } else {
        wx.showToast({ title: res.message || '提交失败', icon: 'none' });
      }
    } catch (error) {
      wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
    } finally {
      this.setData({ submitting: false });
    }
  }
});
