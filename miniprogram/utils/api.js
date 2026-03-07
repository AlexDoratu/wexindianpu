const BASE_URL = 'http://localhost:3000';

function request(url, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res.data || { message: '请求失败' });
        }
      },
      fail: (err) => reject(err)
    });
  });
}

function getProducts(category = '') {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/products${query}`);
}

function createLead(payload) {
  return request('/leads', 'POST', payload);
}

module.exports = {
  getProducts,
  createLead
};
