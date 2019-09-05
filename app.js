const util = require('./utils/util.js');
const Rainbow = require('./utils/rainbow');
const controller = require('./utils/controller.js');
App({
  //  全局数据
  globalData: {
    userInfo: null // 个人信息
  },
  onLaunch: function() {
    // 注册 storage
    wx.Storage = Rainbow.Storage;
    // 注册发布订阅模式
    wx.yue = Rainbow.Event;
    // 扩展全局公共方法
    util.extend(this, controller);

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        } else {
        }
      }
    });
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight;
      }
    });
    /**
     * 获取当前经纬度
     */
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: res => {
        wx.Storage.setItem(
          { location: { lat: res.latitude, lng: res.longitude } },
          () => {
            console.log('经纬度信息设置完成');
          }
        );
      }
    });
  }
});
