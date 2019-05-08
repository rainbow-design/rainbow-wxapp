import utils from "../../../utils/index";
import API from "../../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    error: null,
    repos: []
  },
  onLoad: function(options) {
    let that = this;
    utils
      .promiseRequest(
        API.githubResp + "repositories?q=javascript&sort=stars",
        {},
        "GET"
      )
      .then(res => {
        that.setData({
          repos: res.data.items,
          loaded: true
        });
        // console.log(res.data.items);
      })
      .catch(error => {
        that.setData({
          loaded: true,
          error: error.errMsg
        });
      });
  }
});
