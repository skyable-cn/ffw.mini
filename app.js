//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {}; 

    // 登录

    var that = this
    wx.login({
      success: res => {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              var objz = {};
              objz.avatarUrl = res.userInfo.avatarUrl;
              objz.nickName = res.userInfo.nickName;
              wx.setStorageSync('userInfo', objz);//存储userInfo
            }
          });
          var d = that.globalData;//这里存储了appid、secret、token串  
          wx.request({
            url: 'https://fanfan.skyable.cn/app/wechat/user?CODE='+res.code,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              var obj =  res.data;
              that.globalData.user = obj;
              wx.setStorageSync('user', obj);//存储openid  
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("scope.userInfo="+res.authSetting['scope.userInfo'])
        if(res.authSetting['scope.userInfo'] == undefined){
          this.globalData.permissionFlag = 0
        }else if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          this.globalData.permissionFlag = 1
        }else{
          this.globalData.permissionFlag = 2
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    user: null,
    permissionFlag:null
  }
})