//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    type:null,
    datakey:null,
    fromopenid:null,
    motto: '欢迎使用饭饭吃西安',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    interval1:null,
    interval2:null
  },
  onLoad: function (options) {

    console.log("index:" + JSON.stringify(options))

    if (options.type) {
      this.setData({
        type: options.type
      })
    }

    if (options.fromopenid) {
      this.setData({
        fromopenid: options.fromopenid
      })
    }

    if (options.datakey) {
      this.setData({
        datakey: options.datakey
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo != undefined){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.init();
  },
  init: function () {
    this.data.interval1 = setInterval(this.goIndex,1000);
    this.data.interval2 = setInterval(this.goPermission,1000);
  },
  goIndex:function (){
    var that = this;
    if (that.data.hasUserInfo && app.globalData.user != null){
      console.log(app.globalData.user)
      console.log(app.globalData.location)
      console.log(that.data.userInfo)
      if (that.data.userInfo == undefined){
        return;
      }
      wx.request({
        url: 'https://fanfan.skyable.cn/app/system/init', //仅为示例，并非真实的接口地址
        data: {          //参数为json格式数据
          FROMWXOPEN_ID: that.data.fromopenid,
          WXOPEN_ID: app.globalData.user.openid,
          PHOTO: that.data.userInfo.avatarUrl,
          SEX: that.data.userInfo.gender,
          NICKNAME: that.data.userInfo.nickName
        },
        header: {
          //设置参数内容类型为json
          'content-type': 'application/json'
        },
        success: function (res) {
          if (that.data.type){
            if (that.data.type =='lottery'){
              wx.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/lottery/info?LOTTERY_ID=' + that.data.datakey + '&openid=' + app.globalData.user.openid)
              }) 
            } else if (that.data.type == 'goods'){
              wx.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/goods/info?GOODS_ID=' + that.data.datakey+'&openid=' + app.globalData.user.openid+'&fromopenid='+that.data.fromopenid)
              }) 
            } else if (that.data.type == 'friends'){
              wx.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/index?openid=' + app.globalData.user.openid)
              })
            } else if (that.data.type == 'vipinfo'){
              wx.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/member?openid=' + app.globalData.user.openid)
              })
            }else{
              wx.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/index?openid=' + app.globalData.user.openid)
              })
              }
          }else{
            wx.navigateTo({
              url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/app/index?openid=' + app.globalData.user.openid)
            })
          }
          
        }
      })

      clearInterval(this.data.interval1);
    }else{
      console.log("wait for user . . . ")
    }
  },
  goPermission:function(){
    var that = this;
    if (app.globalData.permissionFlag != null && app.globalData.permissionFlag == '0'){
      wx.hideLoading()
      wx.showToast({
        title: '检测授权',
        icon: 'loading',
        duration: 3000
      })
      clearInterval(that.data.interval2);
    } else if (app.globalData.permissionFlag != null && app.globalData.permissionFlag == '1'){
      clearInterval(that.data.interval2);
    } else if (app.globalData.permissionFlag != null && app.globalData.permissionFlag == '2'){
      wx.hideLoading()
      wx.showToast({
        title: '等待授权',
        icon: 'loading',
        duration: 3000
      })
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)
                if(res.authSetting['scope.userInfo']){
                  app.globalData.permissionFlag = 1
                  //that.data.interval2 = setInterval(that.goPermission,500);
                  wx.getUserInfo({
                    success: res => {
                      app.globalData.userInfo = res.userInfo
                      that.setData({
                        userInfo : res.userInfo,
                        hasUserInfo : true
                      })
                      //that.data.interval1 = setInterval(that.goIndex,500);
                    }
                  })
                }
              }
            })
      clearInterval(that.data.interval2);
    }else{
      console.log('wait for perission . . . ')
    }
  }
})
