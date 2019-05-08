Page({
  data: {
    list: [
      {
        id: "carousel",
        name: "轮播图",
        open: false,
        pages: ["carousel"]
      },
      {
        id: "uploadImg",
        name: "上传图片",
        open: false,
        pages: ["uploadImg"]
      },
      {
        id: "authorization",
        name: "授权登录",
        open: false,
        pages: ["authorization"]
      }
    ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  }
});
