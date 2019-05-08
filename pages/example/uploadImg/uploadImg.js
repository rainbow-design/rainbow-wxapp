Page({
  data: {
    files: []
  },
  getUrl(e) {
    let y = this;
    const data = e.currentTarget.dataset;
    const { files } = this.data;
    const { imgUrl, index } = e.detail;
    if (data.name && !index && imgUrl) {
      this.setData(
        {
          [data.name]: files.concat(imgUrl)
        },
        function() {
          console.log("线上地址", y.data.files);
        }
      );
      // 单个替换
    } else if (index && imgUrl) {
      files.splice(index, 1, imgUrl);
      this.setData(
        {
          [data.name]: files
        },
        function() {
          console.log("线上地址", y.data.files);
        }
      );
      // 删除
    } else if (typeof index === "number" && imgUrl === "") {
      files.splice(index, 1);
      this.setData(
        {
          [data.name]: files
        },
        function() {
          console.log("线上地址", y.data.files);
        }
      );
    } else {
      throw new Error("必须指定一个 data-name 作为键");
    }
  }
});
