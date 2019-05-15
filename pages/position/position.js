// pages/position/position.js
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
    latitude:null,
    longitude:null,
    address:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      if (options.latitude) {
        this.setData({
          latitude: options.latitude
        })
        console.log(options.latitude);
      }
      if (options.longitude) {
        this.setData({
          longitude: options.longitude
        })
        console.log(options.longitude);
      }
      if (options.address) {
        this.setData({
          address: options.address
        })
        console.log(options.address);
      }
      this.positionOperator();
      },
    positionOperator: function(){
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.latitude),
      longitude: parseFloat(that.data.longitude),
      name: that.data.address,
      scale: 15
    })
  }
  }
})
