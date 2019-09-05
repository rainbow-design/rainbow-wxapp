const API = require('../api/index.js');
const fetch = require('./fetch.js');
const util = require('./util.js');
const regeneratorRuntime = require('./runtime.js');

const obj = {
  /**
   * 轻提示
   * @param {*} msg
   * @param {*} fun
   * @param {*} timeStamp
   */
  Toast(msg, fun = null, timeStamp = 1000) {
    var fun1 = fun ? fun : function() {};
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500,
      mask: false,
      success: result => {
        setTimeout(() => {
          fun1(result);
        }, timeStamp);
      }
    });
  },

  toHref(key, params) {
    switch (key) {
      case 'index':
        wx.reLaunch({
          url: '/pages/index/index'
        });
        break;
      // 返回上一页
      case 'last':
        wx.navigateBack({
          delta: 1
        });
        break;
      default:
        throw new Error('app.toHref methor ERROR');
    }
  },
  call(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  }
};

module.exports = obj;
