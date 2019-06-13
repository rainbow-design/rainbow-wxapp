const app = getApp();
import RainBow from "../../../lib/rainbow";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    maskClassName: "columnCenter",
    needShouQuan: true
  },
  onLoad: function(options) {},
  getFromFatherOpenId(e) {
    var data = e.detail;
    var that = this;
    app.globalData.openid = data.openid;
    wx.Storage.setItem("openId", data.openid);
    app.globalData.avatar = data.avatar;
    app.globalData.username = data.username;
    RainBow.toast("已授权成功！", function() {
      setTimeout(function() {
        wx.switchTab({
          url: "../index/index"
        });
      }, 700);
    });

    // console.log('接受值', e.detail)
  }
});
