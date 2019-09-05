function fetch(url, params = {}, type) {
  return new Promise(function(resolve, reject) {
    params.access_token === undefined
      ? (params.access_token = wx.getStorageSync('token'))
      : '';
    if (!url) {
      throw new Error('请输入有效的接口请求路径');
    }
    wx.request({
      url: url,
      data: params,
      method: type || 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode == 200) {
          // wx.showLoading({
          //   title: '加载中',
          // })
          resolve(res);
        } else {
          reject(res.errMsg);
        }
      },
      complete: () => {
        // wx.hideLoading();
      },
      fail: err => {
        reject(err);
        console.log('failed');
      }
    });
  });
}

export default fetch;
