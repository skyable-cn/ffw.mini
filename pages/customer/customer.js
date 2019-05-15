// pages/customer/customer.js

var app = getApp();

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
    customer:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      console.log(options)

      wx.setNavigationBarTitle({
        title: '饭饭网客服中心欢迎你'
      })

      var that = this;

      wx.request({
        url: 'https://fanfan.skyable.cn/app/customer?openid=' + app.globalData.user.openid,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header  
        success: function (res) {
          console.log(res)
          that.setData({
            customer: res.data
          })
        }
      });
    },
    sendMessage: function (e) {
      var groupId = e.currentTarget.dataset['index'];
      console.log("groupId=" + groupId)

      wx.request({
        url: 'https://fanfan.skyable.cn/app/message?openid=' + app.globalData.user.openid + '&GROUPS_ID=' + groupId,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        // header: {}, // 设置请求的 header  
        success: function (res) {
          console.log(res)
        }
      });
    }
  }
 
})
