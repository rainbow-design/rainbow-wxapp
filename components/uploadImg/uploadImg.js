// comments/uploadImg/uploadImg.js
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
            const {
                count,
                imgArr,
                isClose
            } = this.data;
            if (!isClose) {
                wx.chooseImage({
                    count: 2, // 默认9 一次连续选择
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function(res) {
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        var tempFilePaths = res.tempFilePaths;
                        if (imgArr.length + 1 == count) {
                            that.setData({
                                imgArr: imgArr.concat(res.tempFilePaths),
                                isClose: true
                            })
                        } else {
                            that.setData({
                                imgArr: imgArr.concat(res.tempFilePaths)
                            })
                        }

                    }
                })
            }

        },
        // 替换图片
        changeImg: function(e) {
            var that = this;
            var index = e.currentTarget.dataset.index;
            const {
                imgArr
            } = this.data;
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
                    })
                }
            })
        },
        // 删除已选图片
        closeSelectedImg: function(e) {
            var index = e.currentTarget.dataset.index;
            const {
                imgArr
            } = this.data;
            imgArr[index] = false;
            this.setData({
                imgArr: imgArr
            })
        }
    }
})