// comments/uploadImg/uploadImg.js
import api from '../../api/index.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: Number // 允许上传图片的总数
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgArr: [],
    isClose: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加图片资源
    addImg: function() {
      var that = this;
      const { count, imgArr, isClose } = this.data;
      if (!isClose) {
        wx.chooseImage({
          count: 1, // 默认9 一次连续选择
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            that.triggerEvent('pubToFather', { imgUrl: tempFilePaths });
            if (imgArr.length + 1 == count) {
              that.setData({
                imgArr: imgArr.concat(tempFilePaths),
                isClose: true
              });
            } else {
              that.setData({
                imgArr: imgArr.concat(tempFilePaths)
              });
            }
            wx.showLoading({
              title: '图片上传中...',
              mask: true
            });
            //调用上传接口
            wx.uploadFile({
              url: api.imageUpload,
              filePath: tempFilePaths[0],
              name: 'uploaded_file[]',
              success(res) {
                // 服务器上传好的图片真实路径
                var resultImgUrl =
                  api.uploadDomain + JSON.parse(res.data).success_image[0].url;
                that.triggerEvent('getNetUrl', { imgUrl: resultImgUrl });
                var tempImgUrlArr = [];
                tempImgUrlArr.push(resultImgUrl);
                // console.log('真实的线上地址',resultImgUrl)
                wx.hideLoading();
              }
            });
          }
        });
      }
    },
    // 替换图片
    changeImg: function(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      const { imgArr } = this.data;
      wx.chooseImage({
        count: 1, // 一次连续选择只能一张图片
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          imgArr[index] = tempFilePaths;
          that.setData({
            imgArr: imgArr
          });
          wx.uploadFile({
            url: api.imageUpload,
            filePath: tempFilePaths[0],
            name: 'uploaded_file[]',
            success(res) {
              // 服务器上传好的图片真实路径
              var resultImgUrl =
                api.uploadDomain + JSON.parse(res.data).success_image[0].url;
              that.triggerEvent('getNetUrl', {
                imgUrl: resultImgUrl,
                index: index
              });
              wx.hideLoading();
            }
          });
        }
      });
    },
    // 删除已选图片
    closeSelectedImg: function(e) {
      let that = this;
      var index = e.currentTarget.dataset.index;
      const { imgArr } = this.data;
      imgArr[index] = false;
      this.setData(
        {
          imgArr: imgArr
        },
        function() {
          that.triggerEvent('getNetUrl', {
            imgUrl: '',
            index: index
          });
        }
      );
    }
  }
});
