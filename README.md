# wxapp-rainbow

微信小程序自定义组件库

## 使用

### 目录

```
├─api
├─assets
│  └─tabBar
├─components
│  ├─authorization // 授权登录
│  ├─carousel // 轮播图
│  ├─loading // 加载中
│  ├─uploadImg // 上图片t
│  │  └─assets
│  └─wxParse // 富文本
├─filter
├─libs
├─mock
├─pages
│  ├─example
│  │  ├─authorization
│  │  ├─carousel
│  │  ├─loading
│  │  └─uploadImg
│  └─others
├─styles
└─utils
```

> windows 导出命令 `tree >tree.txt`

### 注意事项

- `uploadImg` 组件借助 [Upload.cc](https://upload.cc/#)真实上传，查看测试用例**项目配置**请勾选

  - [x] 不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书

## 特别感谢

- [Upload.cc: 免費圖片上傳網](https://upload.cc/#)
