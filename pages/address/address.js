// pages/address/address.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopname:'',
    shoptype:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.SHOPNAME){
      this.setData({
        shopname: options.SHOPNAME
      })
    }
    if (options.SHOPTYPE_ID) {
      this.setData({
        shoptype: options.SHOPTYPE_ID
      })
    }
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap');
    this.getCenterLocation()

  },
  getCenterLocation: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.chooseLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          success: function (res) {
            console.log(res)
            var path = 'https://fanfan.skyable.cn/app/sellerInit?openid=' + app.globalData.user.openid + '&ADDRESS=' + res.address + '&LATITUDE=' + res.latitude + '&LONGITUDE=' + res.longitude;
            if (that.data.shopname){
              path +='&SHOPNAME=' + that.data.shopname;
            }
            if (that.data.shoptype) {
              path += '&SHOPTYPE_ID=' + that.data.shoptype;
            }
            wx.navigateTo({
              url: '../webview/webview?path=' + encodeURIComponent(path)
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})