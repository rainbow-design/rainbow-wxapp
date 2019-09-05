import fetch from '../../utils/fetch';
import API from '../../api/index';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    //  授权登录
    bindGetUserInfo(e) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        needShouQuan: false
      });
      this.login();
    },
    login() {
      var that = this;
      wx.login({
        success(res) {
          if (res.code) {
            fetch(API.wxLogin, {
              wxcode: res.code
            }).then(response => {
              var data = response.data.data;
              console.log(data);
              if (data && data.openid && data.id) {
                //已登录 true
                // 直接存储数据
                app.globalData.userData = data;
                app.globalData.openid = data.openid;
                that.triggerEvent('pubToFather', data);
                // wx.Storage.setItem("token", data.access_token);
                console.log('app.globalData-----------------------');
                console.dir(app.globalData);
                // that.delayToIndex();
              } else {
                app.globalData.openid = data.openid;
                // 需要去注册
                that.register();
              }
            });
          }
        }
      });
    },
    register() {
      var that = this;
      if (app.globalData.userInfo) {
        var userInfo = app.globalData.userInfo;
        var paramObj = {
          username: userInfo.nickName,
          openid: app.globalData.openid,
          avatar: userInfo.avatarUrl,
          sex: userInfo.gender
        };
        fetch(API.wxRegister, paramObj).then(res => {
          // console.log("注册后获得的数据----------")
          var data = res.data.data;
          that.triggerEvent('pubToFather', data);
        });
      }
    }
  }
});
