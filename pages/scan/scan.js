// pages/scan/scan.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function (e) {
      console.log(e)
      var current = 'https://fanfan.skyable.cn/app/file/image?FILENAME=g1.png';
      wx.previewImage({
        current: current,
        urls: [current]
      })
    }
    }
})
